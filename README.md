# Backend API Documentation

### Endpoint Details

- **URL**: `/user/register`
- **Method**: `POST`

## Description

Registers a new user by creating a user acount with

###HTTP

`POST`

### Request Body

The request body should be in JSON format and include the following field:

```json
{
  "fullname": { 
    "firstname": "string", // Required, min 3 characters
    "lastname": "string" // Optional, min 3 characters if provided
  },
  "email": "string", // Required, valid email format
  "password": "string" // Required, min 6 characters
}
```

### Response Codes

- `201`: User successfully created
- `400`: Validation error or missing fields

### Success Response

**Status Code**: `201 Created`

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_mongodb_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

### Error Response

**Status Code**: `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Validation Rules

- Firstname: Minimum 3 characters
- Email: Must be valid email format
- Password: Minimum 6 characters
- Lastname: Optional, but if provided must be minimum 3 characters

### Example Request

```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}'
```
