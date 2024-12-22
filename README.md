#Backend API Documentation

## Register User Endpoint

### `POST /user/register`

### Request Format

### Description
Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body
The request body should be in JSON format and include the following fields:
-`fullname` (object):
    -`firstname` (string, required): User's first name (minimum 3 characters).
    -`lastname` (string, optional): User's last name (minimum 3 characters).
-`email` (string, required): User's email address (must be a valid email).
-`password` (string, required): User's password (minimum 6 characters).

### Example Response

`user` (object):
 -`fullname` (object).
        -`firstname` (string): User's first name (minimum 3 characters).
        -`lastname` (string): User's last name (minimum 3 characters).
-`email` (string): User's email address (must be a valid email).
-`password` (string): User's password (minimum 6 characters).
-`token` (String): JWT Token

```json
{
  "fullname": {
    "firstname": "string", // required, min 3 characters
    "lastname": "string"   // optional, min 3 characters if provided
  },
  "email": "string",    // required, valid email format
  "password": "string"  // required, min 6 characters
}

```
`Notes`
Password is automatically hashed before storage
JWT token is generated upon successful registration
Email must be unique in the system
```