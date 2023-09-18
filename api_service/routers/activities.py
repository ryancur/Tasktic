from authenticator import authenticator
from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel
from queries.activities import (
    ActivitiesList,
    ActivityIn,
    ActivityInUpdate,
    ActivityOut,
    ActivityOutUpdate,
    ActivityQueries,
    CategoryEnum,
    PriorityEnum,
)

router = APIRouter()


class HttpError(BaseModel):
    detail: str


@router.get("/api/activities/{id}", response_model=ActivityOut)
async def get_one_activity(
    id: str,
    repo: ActivityQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return repo.get_one(id)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No account logged in",
        )


@router.get("/api/activities/", response_model=ActivitiesList | HttpError)
async def get_activity(
    repo: ActivityQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return ActivitiesList(activities=repo.get_all(account_info=account_data))


@router.post("/api/activities/", response_model=ActivityOut | HttpError)
async def create_activity(
    info: ActivityIn,
    repo: ActivityQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    info.email = account["email"]
    if info.start_date is not None:
        info.is_event = True
    else:
        info.is_event = False
        info.start_date = None
        info.end_date = None

    if info.category == "business":
        info.color = "#6aa84f"
    elif info.category == "personal":
        info.color = "#f1c232"
    else:
        info.color = "#cc4125"

    info = repo.create(info)
    return info


@router.delete("/api/activities/{id}", response_model=bool)
async def delete_activity(
    id: str,
    response: Response,
    queries: ActivityQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        queries.delete(id=id)
        response.status_code = 200
        return True
    else:
        response.status_code = 400
        return False


@router.put("/api/activities/{id}", response_model=ActivityOutUpdate)
async def update_activity(
    id: str,
    info: ActivityInUpdate,
    response: Response,
    repo: ActivityQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    info.email = account_data["email"]
    if info.start_date is not None:
        info.is_event = True
    else:
        info.is_event = False
        info.start_date = None
        info.end_date = None

    if info.category == "business":
        info.color = "#6aa84f"
    elif info.category == "personal":
        info.color = "#f1c232"
    else:
        info.color = "#cc4125"
    update = repo.update(id=id, info=info)
    if update is None:
        response.status_code = 404
    else:
        return update


@router.get("/api/priorities")
async def get_priorities():
    output = []
    for priority in PriorityEnum:
        output.append(priority.value)
    return output


@router.get("/api/categories")
async def get_categories():
    output = []
    for category in CategoryEnum:
        output.append(category.value)
    return output
