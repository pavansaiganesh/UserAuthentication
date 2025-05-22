# User Authentication

## Database Setup

**Create Database in SSMS app**:

   CREATE DATABASE UserdataDB;

## Flask Setup

  flask db init
  
  flask db migrate -m "Initial migration"
  
  flask db upgrade
  
  flask run

## Authentication
Tokens are generated upon successful login and stored in browser's localStorage.
All user passwords are encrypted before storage.
