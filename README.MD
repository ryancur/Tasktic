# TaskBoss

Ryan Curry
Jerry Lue
Mark Sue-Wah-Sing
Paul Pham

## Design

- [API design](docs/api-design.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

This application is designed to help users effectively manage and organize their time. It caters to a diverse range of users, making it suitable for individuals such as businessmen, executives, managers, students, and more.

## Functionality

Registration: To register, individuals must supply their basic information in order to create an account. They may also establish a customized username and password to ensure a secure login, along with the option to upload an optional profile picture.

User Profile: Upon registration, users can edit their profiles by changing their information to the most relevent detail.

Scheduling: To create an event/task, users can access the 'Activity ↓' link through the navbar and click on 'Create an Activity'. Once relocated to a the 'Create an Activity' page, users must provide an activity title at least. To specify whether the activity is an event or a task depends if the user adds a date. If the user wants to create an event, they must specify the date, time, and duration of the event, along with any additional information.

### Events Categories:

None - Orange/Red
Buisness - Blue
Personal - Yellow/Orange
Leisure - Red

Notifications: Regardless if it is an event or a task, the application ensure that users never miss an activity as it is populated through the calendar page. Tasks are show through the task list on the left while events should show up through the calendar itself.

Tracking and Organization: Users can easily view and manage their scheduled events through the intuitive user interface and navigate to 'Activity List'. The application provides various sorting and filtering options to streamline the organization of events based on different criteria, such as date, category, or priority.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create mongo-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Exit the container's CLI, and enjoy TaskBoss to its fullest!
