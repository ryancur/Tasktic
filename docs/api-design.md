# TaskBoss API Design

## Endpoints

### TEMPLATE: «Human-readable of the endpoint»

- Endpoint path: «path to use»
- Endpoint method: «HTTP method»
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

- Response: «Human-readable description
  of response»
- Response shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

### Create Account

- Endpoint path: /accounts/create
- Endpoint method: POST

- Request shape (form):

  - first_name: string
  - last_name: string
  - username: string
  - email: EmailStr
  - password: string

- Response: account successfully created
- Response shape (JSON):
  ```json
  {
    "account_created": boolean
  }
  ```

### Update Account

- Endpoint path: /accounts/id
- Endpoint method: PUT

- Request shape (form):

  - id: int
  - first_name: string
  - last_name: string
  - username: string
  - email: EmailStr
  - password: string

- Response: Account information with updated field
- Response shape (JSON):

  ```json
  {
    "account": {
      "id": int,
      "first_name": string,
      "last_name": string,
      "username": string,
      "email": EmailStr,
      "password": string
    }
  }
  ```

### Delete Account

- Endpoint path: /accounts/delete
- Endpoint method: DELETE

- Request shape (form):

  - id: int

- Response: account deleted created
- Response shape (JSON):
  ```json
  {
    "account_deleted": boolean
  }
  ```

### Log in

- Endpoint path: /accounts/login
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):

  ```json
  {
    "account": {
      "id": int,
    },
    "token": string
  }
  ```

### Log out

- Endpoint path: /accounts/logout
- Endpoint method: DELETE
- NOTE: this deletes the session token and re-routes to the login page

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  {
    "logout": boolean
  }
  ```

### Create Activity

- Endpoint path: /activities/create
- Endpoint method: POST

- Request shape (form):

  - category: string
  - title: string
  - description: string (optional)
  - date (optional)
  - time (optional)
  - location (optional)
  - is_event: true/false

- Response: activity successfully created
- Response shape (JSON):

  ```json
  {
    "category": string,
    "title": string
  }
  ```

### Get Activities

- Endpoint path: /activities
- Endpoint method: GET

- Headers:

  - Authorization : Bearer Token

- Response: Task list
- Response shape:

  ```json
  {
    "activities":[
      {
        "name": string,
        "description": string,
        "time": datetime,
        "date": datetime,
        "location":string,
        "priority": select,
        "category": string
      }
    ]
  }
  ```

### Get Activity Details

- Endpoint path: /activities/id
- Endpoint method: GET

- Headers:

  - Authorization : Bearer Token

- Response: Activity details
- Response shape:

  ```json
    {
      "activity":[
        {
          "name": string,
          "description": string,
          "time": datetime,
          "date": datetime,
          "location":string,
          "priority": select,
          "category": string
        }
      ]
    }
  ```

### Change Activity Details

- Endpoint path: /activities/id
- Endpoint method: PUT

- Headers:

  - Authorization : Bearer Token

- Response: Activity details with updated field(s)
- Response shape:

  ```json
    {
      "activity":[
        {
          "name": string,
          "description": string,
          "time": datetime,
          "date": datetime,
          "location":string,
          "priority": select,
          "category": string
        }
      ]
    }
  ```
