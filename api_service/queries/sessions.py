from .client import Queries
from .accounts import AccountIn
from bson.objectid import ObjectId
from typing import Optional

from pydantic import BaseModel


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            # TODO: use a more specific exception
            except Exception:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class SessionOut(BaseModel):
    jti: str
    account_id: str


class SessionQueries(Queries):
    DB_NAME = "mongo"
    COLLECTION = "sessions"

    def get(self, jti: str):
        return self.collection.find_one({"jti": jti})

    def create(self, jti: str, account: AccountIn) -> Optional[SessionOut]:
        result = self.collection.insert_one(
            {
                "jti": jti,
                "account_id": ObjectId(account.id),
            }
        )
        if result and result.inserted_id:
            return SessionOut(jti=jti, account_id=account.id)
        return None

    def delete(self, jti: str):
        self.collection.delete_many({"jti": jti})

    def validate(self, jti: str):
        return self.collection.count_documents({"jti": jti}) > 0

    def delete_sessions(self, account_id: str):
        self.collection.delete_many({"account_id": ObjectId(account_id)})
