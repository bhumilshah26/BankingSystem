# Password Reset & Recovery Setup

This document provides setup instructions for the password reset and recovery functionality.

## Backend Setup

### 1. Database Schema Update

Run the following SQL commands to add password reset fields to your database:

```sql
-- Add password reset fields to users table
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry DATETIME NULL;

-- Create index for better performance on reset token lookups
CREATE INDEX idx_reset_token ON users(reset_token);
CREATE INDEX idx_reset_token_expiry ON users(reset_token_expiry);
```

### 2. Environment Variables

Add the following environment variables to your `.env` file:

```env
# Email Configuration (Gmail)
APP_PASS=your_gmail_app_password

# Frontend URL (for reset links)
FRONTEND_URL=http://localhost:3000
```

### 3. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for your application
4. Use this password in the `APP_PASS` environment variable

## Frontend Setup

### 1. New Routes Added

The following routes have been added to the application:

- `/forgot-password` - Request password reset
- `/reset-password` - Reset password with token

### 2. Components Created

- `ForgotPassword.jsx` - Email input form
- `ResetPassword.jsx` - Password reset form with token validation

## Features Implemented

### Backend Features

1. **Password Reset Request** (`POST /users/request-reset`)
   - Validates email exists
   - Generates secure reset token
   - Sends email with reset link
   - Token expires in 1 hour

2. **Password Reset** (`POST /users/reset-password`)
   - Validates reset token
   - Updates password securely
   - Clears reset token after use

3. **Token Verification** (`GET /users/verify-reset-token/:token`)
   - Validates token before showing reset form
   - Checks token expiration

### Frontend Features

1. **Forgot Password Page**
   - Email input with validation
   - Success/error messaging
   - Loading states
   - User-friendly instructions

2. **Reset Password Page**
   - Token validation on page load
   - Password strength requirements
   - Password confirmation
   - Show/hide password toggles
   - Real-time validation feedback

3. **Security Features**
   - Token expiration (1 hour)
   - Secure token generation
   - Password hashing
   - Input validation
   - Error handling

## Email Template

The password reset email includes:
- Professional BSNB Banking branding
- Clear call-to-action button
- Security information
- Expiration notice

## Testing

### Test Cases

1. **Request Password Reset**
   - Valid email → Success
   - Invalid email → Error message
   - Network error → Error handling

2. **Reset Password**
   - Valid token → Success
   - Expired token → Error
   - Invalid token → Error
   - Password mismatch → Validation error
   - Weak password → Validation error

3. **Email Delivery**
   - Check inbox for reset email
   - Verify reset link works
   - Test link expiration

## Security Considerations

1. **Token Security**
   - 32-byte random tokens
   - 1-hour expiration
   - Single-use tokens
   - Secure storage

2. **Password Security**
   - Minimum 6 characters
   - Bcrypt hashing
   - Password confirmation

3. **Email Security**
   - HTTPS reset links
   - Professional email template
   - Clear security instructions

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail app password
   - Verify environment variables
   - Check email service logs

2. **Reset link not working**
   - Verify FRONTEND_URL environment variable
   - Check token expiration
   - Validate database schema

3. **Database errors**
   - Run schema update SQL
   - Check database connection
   - Verify table structure

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/request-reset` | Request password reset |
| POST | `/users/reset-password` | Reset password with token |
| GET | `/users/verify-reset-token/:token` | Verify reset token |

## Files Modified/Created

### Backend
- `src/controllers/userControllers.js` - Added password reset functions
- `src/routes/userRoutes.js` - Added password reset routes
- `database_update.sql` - Database schema update

### Frontend
- `src/pages/forgotPassword.jsx` - New component
- `src/pages/resetPassword.jsx` - New component
- `src/pages/login.jsx` - Added forgot password link
- `src/App.js` - Added new routes 