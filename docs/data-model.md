# Data models

---

### Accounts



| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| email            | string | yes    | no       |
| username         | string | yes    | no       |
| password         | string | yes    | no       |
| first_name       | string | no     | no       |
| last_name        | string | no     | no       |
| picture_url      | string | no     | yes      |


The `account` entity contains the data about the user and their authentication.

---

### Activities


| name             | type     | unique | optional |
| ---------------- | -------- | ------ | -------- |
| title            | string   | no     | no       |
| description      | string   | no     | yes      |
| start_date       | datetime | no     | yes      |
| end_date         | datetime | no     | yes      |
| location         | string   | no     | yes      |
| category         | string   | no     | no       |
| priority         | string   | no     | no       |
| is_event         | bool     | no     | yes      |
| email            | string   | no     | yes      |
| color            | string   | no     | yes      |




The `activities` entity contains the data about tasks and events that the user puts into their calendar.
