# Library Management System - Backend API

A comprehensive REST API for the Digital Library Management System built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT-based authentication
- 📚 Complete CRUD operations for books
- 👥 User management system
- 🔄 Book borrowing and return system
- 🛡️ Role-based access control (Admin/User)
- ✅ Input validation and error handling
- 🔒 Password encryption with bcrypt

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, CORS
- **Validation**: express-validator

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
mongod
```

4. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books (with pagination, search, filter)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Borrowing
- `POST /api/borrow` - Borrow a book
- `GET /api/borrow/user/:userId` - Get user's borrowed books
- `PUT /api/borrow/:id/return` - Return a book

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Book.js           # Book schema
│   │   └── Borrow.js         # Borrow schema
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   ├── bookController.js # Book operations
│   │   ├── userController.js # User operations
│   │   └── borrowController.js # Borrowing logic
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── bookRoutes.js     # Book endpoints
│   │   ├── userRoutes.js     # User endpoints
│   │   └── borrowRoutes.js   # Borrow endpoints
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   ├── errorHandler.js   # Error handling
│   │   └── validators.js     # Input validation
│   ├── utils/
│   │   └── helpers.js        # Helper functions
│   └── server.js             # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Default Admin Account

After seeding the database, you can use:
- Email: `admin@library.com`
- Password: `admin123`

## License

MIT License - Created by Anubhav Das
