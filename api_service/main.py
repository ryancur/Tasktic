import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from authenticator import authenticator
from routers import accounts, activities

app = FastAPI()

origins = [
    os.environ.get("CORS_HOST", None),
    "http://localhost:3000",
    "https://the-brain-cell.gitlab.io",
    "https://the-brain-cell.gitlab.io/module3-project-gamma:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(activities.router)


@app.get("/")
def health_check():
    return {"Hello": "World"}
