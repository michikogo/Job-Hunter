# Job Hunter

This web application is used to organize applicants' applications to jobs openings. Users can sign up and log in. When the user is logged in they can add applications, update and delete them. The update functionality will allow users to update the statuses of their applications from applied, interview, technical test, offer, and rejected. The application is responsive and it is written in `React.js` with `MongoDB Atlas`.

_To know more about the components and its branches checkout JobHunter-Diagram.png_

## Installation

To use the application make sure to do the following steps:

1. Stay in the main branch and clone the repository:
   ```bash
   git clone https://github.com/michikogo/Job-Hunter.git
   ```
2. Install packages for both to client folder and current folder
   a. current folder
   ```bash
   npm install
   ```
   b. client folder
   ```bash
   cd client
   npm install
   ```

## Usage

To be able to use [Job Hunter](https://lit-journey-80521.herokuapp.com) the following steps needs to be followed, without following the steps only the front end will be running:

1. Follow the steps in the installation
2. Then start the server, this will start the server and run the backend
   ```bash
   npm start
   ```

## Improvements

- Calendar could be added since part of the "Add Application" asks for a date that can be added to the calendar
- Date applied could be changed to important dates or notes
