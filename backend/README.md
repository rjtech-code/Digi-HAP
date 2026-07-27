# DigiHAP Backend API

Backend API for DigiHAP (Digital Heat Action Platform) - A citizen-centric platform for heat resilience and public safety.

## Features

- User profile creation and management
- Medical condition tracking for vulnerable citizens
- RESTful API with Express.js
- MongoDB database with Mongoose
- Input validation and error handling
- Security middleware (Helmet, CORS)
- Future-ready for email notifications and admin dashboards

## Project Structure

```
backend/
├── server.js              # Express server entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   └── UserProfile.js     # Mongoose schema for user profiles
├── controllers/
│   └── profileController.js # Business logic for profiles
├── routes/
│   └── profileRoutes.js   # API routes
├── middleware/
│   ├── errorHandler.js    # Global error handling
│   └── validateRequest.js # Input validation
└── utils/                 # Utility functions (future use)
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://rjtechtop5_db_user:<db_password>@cluster0.mtnfezb.mongodb.net/
CORS_ORIGIN=http://localhost:5173,https://digihap.vercel.app
```

3. Ensure MongoDB is running on your system

4. Start the development server:
```bash
npm run dev
```

The production API runs at `https://digi-hap.onrender.com`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Profiles
- **POST** `/api/profile` - Create a new user profile
- **GET** `/api/profile` - Get all profiles (Admin only - future use)
- **GET** `/api/profile/:id` - Get profile by ID (future use)

## API Usage

### Create Profile

**Endpoint:** `POST /api/profile`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "age": 30,
  "gender": "Male",
  "address": "123 Main St, Churu",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "9876543211",
  "medicalConditions": ["Diabetes", "Asthma"],
  "additionalInfo": "Allergic to penicillin",
  "declaration": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Profile created successfully.",
  "data": {
    "_id": "...",
    "fullName": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "age": 30,
  "gender": "Male",
    "address": "123 Main St, Churu",
    "emergencyContactName": "Jane Doe",
    "emergencyContactPhone": "9876543211",
    "medicalConditions": ["Diabetes", "Asthma"],
    "additionalInfo": "Allergic to penicillin",
    "declaration": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Phone number must be exactly 10 digits"
  ]
}
```

## Validation Rules

- **fullName**: Required, trimmed
- **phone**: Required, exactly 10 digits
- **email**: Required, valid email format
- **age**: Required, integer between 1 and 120
- **gender**: Required, must be "Male", "Female", or "Other"
- **declaration**: Required, must be true

## Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- Error handling middleware
- Environment variables for sensitive data

## Future Enhancements

- Email notifications for medical conditions
- Admin dashboard for profile management
- Hospital dashboard integration
- Ward-wise user filtering
- Heat alert notifications
- SMS integration
- User authentication and authorization
- Profile update and deletion

## License

MIT
