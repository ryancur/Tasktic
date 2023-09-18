# router.py
from typing import Optional

from authenticator import authenticator
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountInUpdate,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)
from queries.activities import ActivityQueries
from queries.sessions import SessionQueries


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        account[
            "password"
        ] = None  # added to not send the hashed password to the frontend
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No account logged in",
        )  # TODO: fix the error message - consider switching to 403 Forbidden


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    session_repo: SessionQueries = Depends(),
):
    print("CREATE ACCOUNT info: ", info)
    # prep the incoming data for storage in DB
    hashed_password = authenticator.hash_password(info.password)
    info.first_name = info.first_name.capitalize()
    info.last_name = info.last_name.capitalize()
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account. Please use a different email address.",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(
        response, request, form, repo, session_getter=session_repo
    )
    return AccountToken(account=account, **token.dict())


@router.put("/api/accounts/{id}", response_model=AccountOut | HttpError)
def update_account(
    id: str,
    info: AccountInUpdate,
    response: Response,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if info.password:
        hashed_password = authenticator.hash_password(info.password)
        info.password = hashed_password
    if info.first_name:
        info.first_name = info.first_name.capitalize()
    if info.last_name:
        info.last_name = info.last_name.capitalize()
    try:
        record = repo.update_account(id=id, info=info)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update account with those credentials. Check Id.",
        )
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/accounts/{id}", response_model=bool)
async def delete_account(
    id: str,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
    repo: SessionQueries = Depends(),
    activities: ActivityQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    # Able to access the document.
    if account_data:
        if account_data["id"] != id:
            raise HTTPException(
                status_code=status.HTTP_403_BAD_REQUEST,
                detail="Unauthorized. Incorrect account id.",
            )
        # delete all activities associated with the account
        activities.delete_many(email=account_data["email"])
        # delete the account
        queries.delete(account_data)
        # delete the sessions associated with the account - logs user out
        repo.delete_sessions(account_data["id"])
        response.status_code = 200
        return True
    else:
        response.status_code = 400
        return False


@router.get("/api/accounts/{id}")
async def get_current_account_info_of_logged_in_user(
    queries: AccountQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        account_data = queries.get(email=account_data["email"])
        output_dict = {
            "id": account_data.id,
            "email": account_data.email,
            "username": account_data.username,
            "first_name": account_data.first_name,
            "last_name": account_data.last_name,
            "picture_url": account_data.picture_url
        }
        return output_dict
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No account logged in",
        )
    # TODO: this doesn't get updated data when the account data is updated
    # through the update endpoint
