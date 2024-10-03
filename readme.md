## Vashfoods Kanban Board Tasks Management App

This is a Kanban board app built using React, Node.js, and Sequelize. It allows users to create, update, and delete tasks, as well as reorder them. The app also includes a login and signup system, as well as a Google OAuth integration.

## Features

- User authentication and authorization
- CRUD operations for tasks
- Reordering tasks
- Google OAuth integration

## Frontend Technologies

- React
- React Router
- Tailwind CSS
- React-Beautiful-DnD

## Backend Technologies

- Node.js
- Express.js
- Sequelize
- JWT
- CORS
- Google OAuth

## Backend Setup

```bash
# Clone the repository
git clone [https://github.com/vashfoods/kanban-board-tasks-management-app.git](https://github.com/yudish12/vashfoods-assignmen.git)

# Change directory to the project
cd vashfoods-assignmen/backend

# Install dependencies
npm install

# Create a .env file in the backend directory and add the following variables:
# I have given my variables to ensure you don't have to go through the hassle of creating accounts
PROD_DB_USERNAME=avnadmin
PROD_DB_PASSWORD=AVNS_iOA9UXSFABs1uJb7Xcm
PROD_DB_NAME=defaultdb
PROD_DB_HOST=pg-1ba9e0c1-yudishchakrawarty3042-56f0.e.aivencloud.com
PROD_DB_PORT=13036

DEV_DB_USERNAME=postgres
DEV_DB_PASSWORD=admin
DEV_DB_NAME=vashfoods
DEV_DB_HOST=localhost
DEV_DB_PORT=5432

JWT_SECRET=secret
ENV=development
JWT_EXPIRE=48h
GOOGLE_CLIENT_ID=374198203654-kobruc8sur4orsr75b5rn0cd4pkvvbps.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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


# Start the development server
node app.js
```

## Frontend Setup

```bash
# Clone the repository
git clone [https://github.com/vashfoods/kanban-board-tasks-management-app.git](https://github.com/yudish12/vashfoods-assignmen.git)

# Change directory to the project
cd vashfoods-assignmen/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Go to http://localhost:5173 to view the app**
