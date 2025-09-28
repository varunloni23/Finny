# FinAI API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
All endpoints except user creation require authentication via JWT tokens.

## User Management

### Create User
```
POST /user
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "currency": "USD",
  "language": "en"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "currency": "USD",
  "language": "en",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Get User
```
GET /user/:id
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "currency": "USD",
  "language": "en",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Update User
```
PUT /user/:id
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "currency": "USD",
  "language": "en",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Delete User
```
DELETE /user/:id
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Expense Management

### Create Expense
```
POST /expense
```

**Request Body:**
```json
{
  "userId": 1,
  "title": "Groceries",
  "amount": 120.50,
  "currency": "USD",
  "date": "2023-06-15",
  "category": "Food",
  "description": "Weekly grocery shopping",
  "isRecurring": false
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "title": "Groceries",
  "amount": 120.50,
  "currency": "USD",
  "date": "2023-06-15",
  "category": "Food",
  "description": "Weekly grocery shopping",
  "isRecurring": false,
  "createdAt": "2023-06-15T00:00:00.000Z",
  "updatedAt": "2023-06-15T00:00:00.000Z"
}
```

### Get All Expenses
```
GET /expense
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Groceries",
    "amount": 120.50,
    "currency": "USD",
    "date": "2023-06-15",
    "category": "Food",
    "description": "Weekly grocery shopping",
    "isRecurring": false,
    "createdAt": "2023-06-15T00:00:00.000Z",
    "updatedAt": "2023-06-15T00:00:00.000Z"
  }
]
```

### Get Expense by ID
```
GET /expense/:id
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "title": "Groceries",
  "amount": 120.50,
  "currency": "USD",
  "date": "2023-06-15",
  "category": "Food",
  "description": "Weekly grocery shopping",
  "isRecurring": false,
  "createdAt": "2023-06-15T00:00:00.000Z",
  "updatedAt": "2023-06-15T00:00:00.000Z"
}
```

### Get Expenses by User
```
GET /expense/user/:userId
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Groceries",
    "amount": 120.50,
    "currency": "USD",
    "date": "2023-06-15",
    "category": "Food",
    "description": "Weekly grocery shopping",
    "isRecurring": false,
    "createdAt": "2023-06-15T00:00:00.000Z",
    "updatedAt": "2023-06-15T00:00:00.000Z"
  }
]
```

### Update Expense
```
PUT /expense/:id
```

**Request Body:**
```json
{
  "amount": 150.00,
  "description": "Weekly grocery shopping with extras"
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "title": "Groceries",
  "amount": 150.00,
  "currency": "USD",
  "date": "2023-06-15",
  "category": "Food",
  "description": "Weekly grocery shopping with extras",
  "isRecurring": false,
  "createdAt": "2023-06-15T00:00:00.000Z",
  "updatedAt": "2023-06-16T00:00:00.000Z"
}
```

### Delete Expense
```
DELETE /expense/:id
```

**Response:**
```json
{
  "message": "Expense deleted successfully"
}
```

## Investment Management

### Create Investment
```
POST /investment
```

**Request Body:**
```json
{
  "userId": 1,
  "name": "Bitcoin",
  "type": "crypto",
  "amount": 5000.00,
  "currency": "USD",
  "quantity": 0.25,
  "purchasePrice": 40000.00,
  "purchaseDate": "2023-01-15",
  "symbol": "BTC",
  "recommendation": "hold"
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Bitcoin",
  "type": "crypto",
  "amount": 5000.00,
  "currency": "USD",
  "quantity": 0.25,
  "purchasePrice": 40000.00,
  "purchaseDate": "2023-01-15",
  "symbol": "BTC",
  "recommendation": "hold",
  "createdAt": "2023-01-15T00:00:00.000Z",
  "updatedAt": "2023-01-15T00:00:00.000Z"
}
```

### Get All Investments
```
GET /investment
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Bitcoin",
    "type": "crypto",
    "amount": 5000.00,
    "currency": "USD",
    "quantity": 0.25,
    "purchasePrice": 40000.00,
    "purchaseDate": "2023-01-15",
    "symbol": "BTC",
    "recommendation": "hold",
    "createdAt": "2023-01-15T00:00:00.000Z",
    "updatedAt": "2023-01-15T00:00:00.000Z"
  }
]
```

### Get Investment by ID
```
GET /investment/:id
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Bitcoin",
  "type": "crypto",
  "amount": 5000.00,
  "currency": "USD",
  "quantity": 0.25,
  "purchasePrice": 40000.00,
  "purchaseDate": "2023-01-15",
  "symbol": "BTC",
  "recommendation": "hold",
  "createdAt": "2023-01-15T00:00:00.000Z",
  "updatedAt": "2023-01-15T00:00:00.000Z"
}
```

### Get Investments by User
```
GET /investment/user/:userId
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Bitcoin",
    "type": "crypto",
    "amount": 5000.00,
    "currency": "USD",
    "quantity": 0.25,
    "purchasePrice": 40000.00,
    "purchaseDate": "2023-01-15",
    "symbol": "BTC",
    "recommendation": "hold",
    "createdAt": "2023-01-15T00:00:00.000Z",
    "updatedAt": "2023-01-15T00:00:00.000Z"
  }
]
```

### Update Investment
```
PUT /investment/:id
```

**Request Body:**
```json
{
  "amount": 6000.00,
  "quantity": 0.30
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Bitcoin",
  "type": "crypto",
  "amount": 6000.00,
  "currency": "USD",
  "quantity": 0.30,
  "purchasePrice": 40000.00,
  "purchaseDate": "2023-01-15",
  "symbol": "BTC",
  "recommendation": "hold",
  "createdAt": "2023-01-15T00:00:00.000Z",
  "updatedAt": "2023-01-16T00:00:00.000Z"
}
```

### Delete Investment
```
DELETE /investment/:id
```

**Response:**
```json
{
  "message": "Investment deleted successfully"
}
```

## Dashboard

### Get Dashboard Data
```
GET /dashboard/:userId
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "currency": "USD",
    "language": "en",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "expenses": [
    // Array of expense objects
  ],
  "investments": [
    // Array of investment objects
  ],
  "expenseInsights": "AI-generated expense insights",
  "investmentRecommendations": "AI-generated investment recommendations",
  "marketData": [
    // Array of market data objects
  ]
}
```

## Health Check

### API Health Status
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "service": "FinAI Backend API"
}
```