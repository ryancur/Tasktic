from main import app
from pydantic import BaseModel
from authenticator import authenticator
from fastapi.testclient import TestClient
from queries.accounts import AccountQueries

client = TestClient(app)

# Arrange where you write out the data that you're going to use in the test

# Act where you call the function or method that you want to test

# Assert where you check to see if the result is what you expected


class Account(BaseModel):
    id: str
    email: str
    username: str
    password: str
    first_name: str
    last_name: str
    picture_url: str | None


class FakeQueries:
    def get(self, email):
        return Account(
            id="1",
            email="test@example.com",
            username="testuser",
            first_name="Test",
            last_name="User",
            password="password",
            picture_url="https://example.com/picture.jpg",
        )


def fake_account():
    return {
        "id": "1",
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User",
        "picture_url": "https://example.com/picture.jpg",
    }


def test_get_account():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_account
    app.dependency_overrides[AccountQueries] = FakeQueries
    response = client.get("/api/accounts/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == fake_account()


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
