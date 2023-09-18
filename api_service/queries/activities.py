from pydantic import BaseModel
from bson.objectid import ObjectId
from typing import List, Optional
from .accounts import Queries
from datetime import datetime
from enum import Enum


class PriorityEnum(str, Enum):
    urgent = "urgent"
    important = "important"
    not_important = "not important"


class CategoryEnum(str, Enum):
    business = "business"
    personal = "personal"
    leisure = "leisure"


class ActivityIn(BaseModel):
    title: str
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    location: Optional[str]
    category: str
    priority: str
    is_event: Optional[bool]
    email: Optional[str]
    color: Optional[str]


class ActivityOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    location: Optional[str]
    category: str
    priority: str
    is_event: bool
    email: str
    color: Optional[str]


class ActivitiesList(BaseModel):
    activities: List[ActivityOut]


class ActivityInUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    location: Optional[str]
    category: Optional[str]
    is_event: Optional[bool]
    priority: Optional[str]
    email: Optional[str]
    color: Optional[str]


class ActivityOutUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    location: Optional[str]
    category: Optional[str]
    is_event: Optional[bool]
    priority: Optional[str]
    email: Optional[str]
    color: Optional[str]


class ActivityQueries(Queries):
    DB_NAME = "mongo"
    COLLECTION = "activities"

    def get_one(self, id: str) -> ActivityOut:
        result = self.collection.find_one({"_id": ObjectId(id)})
        if not result:
            return None  # this response gives a 500 error - need to fix this
        result["id"] = str(result["_id"])
        return ActivityOut(**result)

    def get_all(self, account_info) -> ActivityOut:
        result = self.collection.aggregate(
            [
                {
                    "$lookup": {
                        "from": "accounts",
                        "localField": "email",
                        "foreignField": "email",
                        "as": "account",
                    }
                }
            ]
        )
        activities_list = list(result)
        # activities = list(result)
        tasks = []
        events = []
        for activity in activities_list:
            if activity["start_date"]:
                events.append(activity)
            else:
                tasks.append(activity)
        sorted_events = sorted(events, key=lambda d: d["start_date"], reverse=True)
        activities = sorted_events + tasks
        print(activities)
        for activity in activities:
            activity["id"] = str(activity["_id"])
        return [
            ActivityOut(**activity)
            for activity in activities
            if activity["email"] == account_info["email"]
        ]

    def create(self, info: ActivityIn) -> ActivityOut:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return ActivityOut(**props)

    def delete(self, id: str):
        """Delete one activity using the id"""
        try:
            self.collection.delete_one({"_id": ObjectId(id)})
            return True
        # TODO: use a more specific exception
        except Exception:
            return False

    def delete_many(self, email: str):
        """
        Delete all the activities associated with an email.
        Used when deleting an account.
        """
        try:
            self.collection.delete_many({"email": email})
            return True
        # TODO: use a more specific exception
        except Exception:
            return False

    def update(self, id: str, info: ActivityOutUpdate):
        props = info.dict()
        current_data = self.collection.find_one({"_id": ObjectId(id)})
        activity_update = {k: v for k, v in props.items() if v}
        for current_key, current_value in current_data.items():
            if current_key not in activity_update:
                activity_update[current_key] = current_value
        update_query = {
            "$set": {
                field: value
                for field, value in activity_update.items()
                if field != "email"
            }
        }
        self.collection.update_one({"_id": ObjectId(id)}, update_query)
        result = self.collection.find_one({"_id": ObjectId(id)})
        return ActivityOutUpdate(**result)
