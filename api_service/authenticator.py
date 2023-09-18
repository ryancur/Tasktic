import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountIn
from queries.sessions import SessionQueries
from datetime import timedelta


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountIn) -> str:
        return account.password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.email, AccountOut(**account.dict())

    def get_session_getter(self, session_repo: SessionQueries = Depends()):
        return session_repo

    async def jti_created(self, jti, account, session_repo):
        session_repo.create(jti, account)

    async def jti_destroyed(self, jti, session_repo):
        session_repo.delete(jti)

    async def validate_jti(self, jti, session_repo):
        return session_repo.get(jti) is not None


expiration_in_hours = timedelta(hours=24)

authenticator = MyAuthenticator(os.environ.get("SIGNING_KEY"), exp=expiration_in_hours)
