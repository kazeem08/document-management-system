# DOCUMENT MANAGEMENT SYSTEM

# Licensing information: READ LICENSE

# Project source can be downloaded from https://github.com/kazeem08/document-management-system.git

# Author

Kazeem Jimoh

# How to run the file

1. Clone from the repository to your system
2. Run the command `npm install` to install node modules and update the dependencies
3. Rename the .envExample file to .env and to set your environment variables
4. Install mongodb
5. Run the command `mongod` below to start your server
6. Run the command `npm seed` or `npm seed-refresh` to populate data into your database
7. Run the command `npm start` to start the application
8. visit http://127.0.0.1:<PORT>/api-docs to see the documentation

## Overview

- API endpoints.

| End-Points                | Functionality                                       |
| :------------------------ | :-------------------------------------------------- |
| POST /api/login           | Logs a user in.                                     |
| POST /api/logout          | Logs a user out.                                    |
| POST /api/users/          | Creates a new user.                                 |
| GET /api/users/           | Find matching instances of user.                    |
| GET /api/documents        | Find matching instances of user's unique documents. |
| GET /api/users/me         | Find user.                                          |
| PUT /api/users/me         | Update user attributes.                             |
| DELETE /api/users/me      | Delete user.                                        |
| POST /api/documents/      | Creates a new document instance.                    |
| GET /api/documents/       | Find matching instances of document.                |
| GET /api/documents/:id    | Find document.                                      |
| PUT /api/documents/:id    | Update document attributes.                         |
| DELETE /api/documents/:id | Delete document.                                    |
| POST /api/roles/          | Creates a new role instance.                        |
| GET /api/roles/           | returns all roles.                                  |
| GET /api/roles/:id        | Find role.                                          |
| PUT /api/roles/:id        | Update document attributes.                         |
