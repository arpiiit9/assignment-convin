# Backend API for Daily Expenses Sharing Application

This README provides comprehensive instructions on setting up, running, and testing the backend API for the daily expenses sharing application. The API supports user management and expense tracking with different split methods.

## Table of Contents

1. [Setup](#setup)
2. [Running the Application](#running-the-application)
3. [API Endpoints](#api-endpoints)
   - [User Signup](#user-signup)
   - [Add Expense with Equal Split](#add-expense-with-equal-split)
   - [Add Expense with Percentage Split](#add-expense-with-percentage-split)
   - [Add Expense with Exact Amounts](#add-expense-with-exact-amounts)
   - [Download Expense PDF](#download-expense-pdf)
4. [Testing the API](#testing-the-api)

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

## Install Dependencies

Ensure you have Node.js and npm installed. Run the following command to install all required dependencies:


Copy code
npm install

## Environment Variables

Create a .env file in the root directory and add your MongoDB URI and JWT secret:

env
Copy code
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<your-jwt-secret>

### Running the Application
Start the Server

Run the following command to start the server:

bash
Copy code
npm start
The server will be running at http://localhost:5000.

### API Endpoints
1. User Signup
 Method: POST
 URL: http://localhost:5000/api/users
  Description: Registers a new user.
  Request Body (raw JSON format):json
 Copy code
 {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "1234567890",
  "password": "password123"
}

 -Expected Response:

Status Code: 201 (Created)
Body: Contains the newly created user object and a JWT token.

2. ## Add Expense with Equal Split

Method: POST
URL: http://localhost:5000/api/expenses/equal
Description: Adds an expense and splits it equally among all participants.
Request Body (raw JSON format):
json
Copy code
{
  "description": "Dinner",
  "totalAmount": 60,
  "friends": [
    {
      "name": "Alice"
    },
    {
      "name": "Bob"
    }
  ]
}
Expected Response:

Status Code: 201 (Created)
Body: Contains the details of the expense with each participant's amount owed.

3. ## Add Expense with Percentage Split
Method: POST
URL: http://localhost:5000/api/expenses/percentage
Description: Adds an expense and splits it based on the given percentages.
Request Body (raw JSON format):
json
Copy code
{
  "description": "Lunch with colleagues",
  "totalAmount": 200,
  "friends": [
    {
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "name": "Bob",
      "email": "bob@example.com"
    },
    {
      "name": "Charlie",
      "email": "charlie@example.com"
    }
  ],
  "percentages": [
    50,
    30,
    20
  ]
}
Expected Response:
Status Code: 201 (Created)
Body: Contains the details of the expense with each participant's amount owed based on the percentage split.


4. ## Add Expense with Exact Amounts
Method: POST
URL: http://localhost:5000/api/expenses/exact
Description: Adds an expense and specifies the exact amount each participant owes.
Request Body (raw JSON format):
json
Copy code
{
  "description": "Dinner with friends",
  "totalAmount": 120,
  "friends": [
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    },
    {
      "name": "Emily Johnson",
      "email": "emily.johnson@example.com"
    }
  ],
  "amounts": [
    50,
    40,
    30
  ]
}
Expected Response:
Status Code: 201 (Created)
Body: Contains the details of the expense with each participant's exact amount owed.
5. ## Download Expense PDF
Method: GET
URL: http://localhost:5000/api/expenses/:id
Description: Downloads a PDF report of an expense based on the given expense ID.
Parameters:
id: Replace :id with the actual expense ID.
Expected Response:
Status Code: 200 (OK)
Content-Disposition Header: Should be attachment; filename=expense.pdf
Content-Type Header: Should be application/pdf
Body: The response should prompt a download of a PDF file containing the expense details.
Testing the API
Start the Server: Ensure the server is running.

Use Postman: Open Postman or a similar tool to send HTTP requests and view responses.

