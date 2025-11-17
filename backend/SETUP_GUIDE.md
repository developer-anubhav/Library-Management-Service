# Backend Setup Guide

## Prerequisites

Before running the backend, ensure you have the following installed:

1. **Node.js** (v18 or higher)
2. **MongoDB** (v6 or higher) - Choose one option:
   - **Option A**: Local MongoDB installation
   - **Option B**: MongoDB Atlas (Cloud) - Free tier available

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure MongoDB

#### Option A: Local MongoDB

1. Install MongoDB on your system:
   - **Ubuntu/Debian**: `sudo apt-get install mongodb`
   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. Start MongoDB service:
   - **Ubuntu/Debian**: `sudo systemctl start mongodb`
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB runs as a service automatically

3. Verify MongoDB is running:
   ```bash
   mongosh --eval "db.version()"
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster (free tier M0)

3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Grant "Read and write to any database" role

4. Whitelist your IP:
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development

5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 3. Configure Environment Variables

Edit the `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/library_management

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library_management?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Important**: Change `JWT_SECRET` to a random, secure string in production!

### 4. Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

This will create:
- 1 Admin user (admin@library.com / admin123)
- 2 Regular users (john@example.com / password123, jane@example.com / password123)
- 10 Sample books
- 2 Sample borrow records

### 5. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Verify Installation

### 1. Check Server Health

Open your browser or use curl:

```bash
curl http://localhost:5000
```

Expected response:
```json
{
  "success": true,
  "message": "Library Management System API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "books": "/api/books",
    "users": "/api/users",
    "borrow": "/api/borrow"
  }
}
```

### 2. Test Authentication

Register a new user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response for authenticated requests.

### 3. Test Book Endpoints

Get all books:

```bash
curl http://localhost:5000/api/books
```

Get a specific book (replace {id} with actual book ID):

```bash
curl http://localhost:5000/api/books/{id}
```

## Connecting Frontend to Backend

### 1. Update Frontend Environment Variables

In your frontend project, create or update `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Start Both Servers

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd ../
npm run dev
```

The frontend will run on `http://localhost:5173` and connect to the backend on `http://localhost:5000`.

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
1. Verify MongoDB is running: `mongosh`
2. Check MongoDB URI in `.env` file
3. For Atlas: Verify IP whitelist and credentials

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
1. Kill the process using port 5000:
   ```bash
   # Linux/Mac
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
2. Or change the PORT in `.env` file

### CORS Issues

If you get CORS errors in the browser console:

1. Verify backend CORS is enabled (already configured)
2. Check frontend is using correct API URL
3. Ensure both servers are running

### JWT Token Issues

**Error**: `Not authorized to access this route`

**Solutions**:
1. Verify token is included in Authorization header: `Bearer {token}`
2. Check token hasn't expired (default: 7 days)
3. Re-login to get a new token

## API Testing Tools

### Recommended Tools:
1. **Postman** - [Download](https://www.postman.com/downloads/)
2. **Insomnia** - [Download](https://insomnia.rest/download)
3. **Thunder Client** - VS Code Extension
4. **curl** - Command line (already installed)

### Import API Collection

See `API_DOCUMENTATION.md` for complete endpoint documentation.

## Production Deployment

### Environment Variables for Production:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=very_secure_random_string_at_least_32_characters
JWT_EXPIRE=7d
```

### Security Checklist:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas or secure MongoDB instance
- [ ] Enable MongoDB authentication
- [ ] Restrict MongoDB network access
- [ ] Use HTTPS in production
- [ ] Set appropriate CORS origins
- [ ] Enable rate limiting (consider adding express-rate-limit)
- [ ] Keep dependencies updated
- [ ] Use environment-specific configurations

## Support

For issues or questions:
1. Check the API documentation: `API_DOCUMENTATION.md`
2. Review error logs in the console
3. Verify all environment variables are set correctly

## Next Steps

1. ✅ Backend is running
2. ✅ Database is connected
3. ✅ Sample data is seeded
4. 🔄 Connect frontend to backend
5. 🔄 Test all features end-to-end
6. 🚀 Deploy to production

Happy coding! 🎉
