from fastapi.testclient import TestClient
from main import app
from queries.activities import ActivityQueries
from routers.activities import ActivityIn, ActivityOut
from authenticator import authenticator
from datetime import datetime


client = TestClient(app)


def fake_account_data():
    return {
        "email": "me@me.me",
        "username": "me",
        "password": "me",
        "first_name": "me",
        "last_name": "me",
    }


class CreateActivityQueries:
    def create(self, activity):
        result = {
            "id": 6969,
        }
        result.update(activity)
        return result


def test_create_activity():
    # arrange
    app.dependency_overrides[ActivityQueries] = CreateActivityQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_account_data

    activityin = ActivityIn(
        title="Eat Tacos",
        description="Lets eat some tacos!",
        start_date="2023-06-08T20:46:34.823Z",
        end_date="2023-06-08T21:46:34.823Z",
        location="That taco truck under that bridge ;)",
        category="leisure",
        priority="important",
        is_event=True,
        email="me@me.me",
        color="#cc4125",
    )

    activityout = ActivityOut(
        id=6969,
        title="Eat Tacos",
        description="Lets eat some tacos!",
        start_date="2023-06-08T20:46:34.823Z",
        end_date="2023-06-08T21:46:34.823Z",
        location="That taco truck under that bridge ;)",
        category="leisure",
        priority="important",
        is_event=True,
        email="me@me.me",
        color="#cc4125",
    )

    def convert(activity):
        newactivity = {}
        for pair in activity:
            print("PAIR:", pair)
            if isinstance(pair[1], datetime):
                pair = list(pair)
                pair[1] = pair[1].isoformat()
                print("PAIR2", pair)
            newactivity[pair[0]] = pair[1]
        print("Newactivity:", newactivity)
        return newactivity

    response = client.post("/api/activities/", json=convert(activityin))

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == convert(activityout)
