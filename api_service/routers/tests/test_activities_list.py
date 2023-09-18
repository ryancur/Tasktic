from fastapi.testclient import TestClient
from main import app
from queries.activities import ActivityQueries
from authenticator import authenticator


client = TestClient(app)


class FakeActivityQueries:
    def get_all(self, account_info):
        return [
            {
                "id": "123",
                "title": "test1",
                "description": "test1",
                "start_date": "2023-06-08T10:00:00",
                "end_date": "2023-06-08T12:00:00",
                "location": "test1",
                "category": "personal",
                "priority": "urgent",
                "is_event": True,
                "email": "string1@mail.com",
                "color": "#FF0000"
            },
        ]


def fake_account_data():
    return {"email": "string1@mail.com",
            "username": "User1",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe"}


def test_get_activity():
    app.dependency_overrides[ActivityQueries] = FakeActivityQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_account_data
    response = client.get("/api/activities/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "activities": [
            {
                "id": "123",
                "title": "test1",
                "description": "test1",
                "start_date": "2023-06-08T10:00:00",
                "end_date": "2023-06-08T12:00:00",
                "location": "test1",
                "category": "personal",
                "priority": "urgent",
                "is_event": True,
                "email": "string1@mail.com",
                "color": "#FF0000"
            }
        ]
    }
