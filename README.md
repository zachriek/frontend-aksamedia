# CRUD App - Employee Management System

A simple CRUD (Create, Read, Update, Delete) web application built with authentication and employee data management features.

## Features

- **Login Authentication** (`/login`)
- **Dashboard** (`/`)
- **Employee Management**
  - View employee list with pagination & "per page" control
  - Search employee by name
  - Filter employee by division
  - Add new employee
  - Edit employee data
  - Delete employee
- **Edit Profile**
- **Logout**

## Routes

| Route     | Description             |
|-----------|-------------------------|
| `/login`  | Login page              |
| `/`       | Home/dashboard after login |

## Tech Stack
- Frontend: React + Vite
- Backend: Laravel
- Database: MySQL
- Authentication: Token-based (Sanctum)