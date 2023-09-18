from .client import Queries
from pydantic import BaseModel
from bson.objectid import ObjectId
from typing import Optional


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except Exception:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str
    picture_url: Optional[str]


class AccountInUpdate(BaseModel):
    email: Optional[str]
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    password: Optional[str]
    picture_url: Optional[str]


class AccountOut(BaseModel):
    id: str
    email: str
    username: str
    first_name: str
    last_name: str
    password: Optional[
        str
    ]  # we seem to need this due to line 74 in routers/accounts.py
    # this is due to the built-in login function - isolated but not confirmed
    picture_url: Optional[str]


class AccountQueries(Queries):
    DB_NAME = "mongo"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOut:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        props = info.dict()
        props["password"] = hashed_password
        if self.collection.find_one({"email": props["email"]}):
            raise DuplicateAccountError()
        else:
            self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        output_dict = {
            "id": props["id"],
            "email": props["email"],
            "username": props["username"],
            "first_name": props["first_name"],
            "last_name": props["last_name"],
            "picture_url": props["picture_url"]
        }
        return AccountOut(**output_dict)

    def delete(self, info: dict):
        try:
            row = self.collection.find_one({"email": info["email"]})
            id = str(row["_id"])
            self.collection.delete_one({"_id": ObjectId(id)})
            return True
        # TODO: use a more specific exception
        except Exception:
            return False

    def update_account(self, id: str, info: AccountInUpdate):
        props = info.dict()
        current_data = self.collection.find_one({"_id": ObjectId(id)})
        user_update = {k: v for k, v in props.items() if v}
        for current_key, current_value in current_data.items():
            if current_key not in user_update:
                user_update[current_key] = current_value
        update_query = {
            "$set": {
                field: value for field, value in user_update.items() if field != "email"
            }
        }
        self.collection.update_one({"_id": ObjectId(id)}, update_query)
        result = self.collection.find_one({"_id": ObjectId(id)})
        output_dict = {
            "id": str(result["_id"]),
            "email": result["email"],
            "username": result["username"],
            "first_name": result["first_name"],
            "last_name": result["last_name"],
            "picture_url": props["picture_url"]
        }
        return AccountOut(**output_dict)
