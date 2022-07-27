# FullStack_Assignment

1. Application Description: v2 (containerized version)

   This is a MERN application containing CRUD operations handling with 2 different user types (ADMIN & STUDENT). This has been containerized using docker, and includes docker compose yml file to build and start 3 containers for frontend, backend and database.
   ADMIN view contains comprehensive view on all users registred on the system, including user search functionality to find user by ID, first name, last name or using their email address.
   STUDENT view contains note management functionalities (CRUD) along with backend pagination integrated.
   New user registration flow includes fake SMTP service that deliver e,mail containing temporary user login credentials along with an URL.
   Further this application contains JWT for authentication, protected routes, proper form validations and error handling on both frontend and backend.

2. Installation Guide

   Prerequisite-

   1. Docker installed environment
   2. Ethereal fake email account credentials(https://ethereal.email/)

   Step 1 - Create Ethereal email account and paste Username and Password values into ./backend/utils/email-sender.js file (user & pass parameters)

   Step 2 - Navigate to the root directory and execute "docker compose up" command.

   Step 3 - Open terminal on running backend container and execute execute "npm run seed" command to populate local mongodb with an Admin user (email: admin@gmail.com, password: admin123)"npm install" command to install required npm packages

   Step 4 - Open web application on "http://localhost:3000/"

   \*_Please do not paste email address into input fields, write them by your own. (Otherwise validation will return false)_

3. Student Account Creation

   Step 1 - Open mail box in previously created Ethereal fake email account

   Step 2 - Provide suitable email address on application Registration form

   Step 3 - Tempory login credentials will get deliver into your Ethereal account, (if not refresh mail-box)

   Step 4 - Use same email and provided temporary password on Login screen to access for the first time

   \*_Please do not paste email address into input fields, write them by your own. (Otherwise validation will return false)_

   Step 5 - Provide additional details on Profile Update window to proceed, and login again with new password you provided on that screen.

\*_To view pagination component, please create at least 6 items (Notes/Users)_
