from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountOut
from queries.activities import ActivityOut, ActivityQueries
from authenticator import authenticator
from datetime import datetime


def convert_date_to_str(date_obj: datetime) -> str:
    """
    Helper function that takes a datetime object and converts it to a string.
    output format example: '2023-06-08T21:25:17+00:00'
    """
    return date_obj.isoformat()


client = TestClient(app)


class EmptyActivityQueries:
    def get_all(self, account_info):
        return []


class GetOneActivityQueries:
    def get_one(self, id: str):
        result = {
            "id": "6480ab6a91171625b48aa764",
            "title": "Tech Conference",
            "description": "Learn cloud computing",
            "start_date": "2023-06-08T21:25:17.00Z",
            "end_date": "2023-06-08T21:25:17.00Z",
            "location": "New York",
            "category": "business",
            "priority": "important",
            "is_event": True,
            "email": "ted@me.com",
            "color": "#6aa84f",
        }
        return result


def fake_get_current_account_data():
    return AccountOut(
        id="6480ab6a91171625b48aa763",
        email="ted@me.com",
        username="tedlasso",
        first_name="Ted",
        last_name="Lasso",
        password=None,
        picture_url="",
    )


def test_get_all_activities_empty():
    # arrange
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ActivityQueries] = EmptyActivityQueries

    # act
    response = client.get("/api/activities/")

    # cleanup
    app.dependency_overrides = {}

    # assert
    assert response.status_code == 200
    assert response.json() == {"activities": []}


def test_get_one_activity():
    # arrange
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ActivityQueries] = GetOneActivityQueries

    activity_out = ActivityOut(
        id="6480ab6a91171625b48aa764",
        title="Tech Conference",
        description="Learn cloud computing",
        start_date="2023-06-08T21:25:17.00Z",
        end_date="2023-06-08T21:25:17.00Z",
        location="New York",
        category="business",
        priority="important",
        is_event=True,
        email="ted@me.com",
        color="#6aa84f",
    )

    # act
    response = client.get("/api/activities/6480ab6a91171625b48aa764")

    # clean up
    app.dependency_overrides = {}

    # activity_out converts start_date and end_date to datetime objects
    # need to convert them to strings to be in line with the json response - isoformat
    test_dict = {}
    for k, v in activity_out.dict().items():
        if k == "start_date" or k == "end_date":
            v = convert_date_to_str(v)
        test_dict[k] = v

    # assert
    assert response.status_code == 200
    assert response.json() == test_dict
