# Library Management System - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": { ... }
  }
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Logout successful"
}
```

### Update Password
```http
PUT /api/auth/updatepassword
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}

Response: 200 OK
{
  "success": true,
  "message": "Password updated successfully",
  "data": {
    "token": "new_jwt_token"
  }
}
```

## Book Endpoints

### Get All Books
```http
GET /api/books?page=1&limit=10&search=gatsby&category=Fiction&sortBy=title&order=asc

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search by title, author, or description
- category: Filter by category
- sortBy: Sort field (title, author, year, rating, availability)
- order: Sort order (asc, desc)

Response: 200 OK
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": {
    "books": [ ... ],
    "totalPages": 5,
    "currentPage": 1,
    "totalBooks": 50
  }
}
```

### Get Book by ID
```http
GET /api/books/:id

Response: 200 OK
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "book": { ... }
  }
}
```

### Get Books by Category
```http
GET /api/books/category/:category?page=1&limit=10

Response: 200 OK
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": {
    "books": [ ... ],
    "totalPages": 3,
    "currentPage": 1,
    "totalBooks": 25
  }
}
```

### Get Available Books
```http
GET /api/books/available

Response: 200 OK
{
  "success": true,
  "message": "Available books retrieved successfully",
  "data": {
    "books": [ ... ]
  }
}
```

### Add Book (Admin Only)
```http
POST /api/books
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "978-0-123-45678-9",
  "category": "Fiction",
  "publishedYear": 2020,
  "publisher": "Publisher Name",
  "pages": 300,
  "description": "Book description",
  "totalCopies": 5,
  "availableCopies": 5
}

Response: 201 Created
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "book": { ... }
  }
}
```

### Update Book (Admin Only)
```http
PUT /api/books/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "availableCopies": 3
}

Response: 200 OK
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "book": { ... }
  }
}
```

### Delete Book (Admin Only)
```http
DELETE /api/books/:id
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "Book deleted successfully"
}
```

## User Endpoints

### Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=10&search=john
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [ ... ],
    "totalPages": 2,
    "currentPage": 1,
    "totalUsers": 15
  }
}
```

### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": { ... }
  }
}
```

### Add User (Admin Only)
```http
POST /api/users
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}

Response: 201 Created
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": { ... }
  }
}
```

### Update User
```http
PUT /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+1234567890",
  "address": "123 Main St"
}

Response: 200 OK
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": { ... }
  }
}
```

### Delete User (Admin Only)
```http
DELETE /api/users/:id
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Borrow Endpoints

### Borrow a Book
```http
POST /api/borrow
Authorization: Bearer {token}
Content-Type: application/json

{
  "bookId": "book_id_here",
  "userId": "user_id_here",
  "dueDate": "2024-12-31" // optional, defaults to 30 days from now
}

Response: 201 Created
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "borrow": { ... }
  }
}
```

### Return a Book
```http
PUT /api/borrow/:id/return
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Book returned successfully",
  "data": {
    "borrow": {
      ...
      "fine": 2.5 // if overdue
    }
  }
}
```

### Get User's Borrowed Books
```http
GET /api/borrow/user/:userId?status=borrowed
Authorization: Bearer {token}

Query Parameters:
- status: Filter by status (borrowed, returned, overdue)

Response: 200 OK
{
  "success": true,
  "message": "Borrowed books retrieved successfully",
  "data": {
    "borrows": [ ... ]
  }
}
```

### Get All Borrow Records (Admin Only)
```http
GET /api/borrow?page=1&limit=10&status=borrowed
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "Borrow records retrieved successfully",
  "data": {
    "borrows": [ ... ],
    "totalPages": 5,
    "currentPage": 1,
    "totalBorrows": 50
  }
}
```

### Get Overdue Books (Admin Only)
```http
GET /api/borrow/overdue
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "Overdue books retrieved successfully",
  "data": {
    "borrows": [ ... ]
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [ // optional, for validation errors
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Categories
Available book categories:
- Fiction
- Non-Fiction
- Science
- History
- Technology
- Fantasy
- Mystery
- Romance
- Biography
- Self-Help
- Children
- Other

## Notes
- All protected routes require a valid JWT token in the Authorization header
- Admin-only routes require a token from a user with role "admin"
- Dates should be in ISO 8601 format
- Fine calculation: $0.50 per day for overdue books
- Default borrowing period: 30 days
