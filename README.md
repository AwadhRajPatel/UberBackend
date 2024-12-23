# Backend API Documentation

## Register User Endpoint

### `POST /user/register`

### Request Format

### Description

- Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).--
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
- `fullname` (object):
  - `firstname` (string): User's first name (minimum 3 characters).
  - `lastname` (string): User's last name (minimum 3 characters).
- `email` (string): User's email address (must be a valid email).
- `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

```json
{
  "fullname": {
    "firstname": "string", // required, min 3 characters
    "lastname": "string" // optional, min 3 characters if provided
  },
  "email": "string", // required, valid email format
  "password": "string" // required, min 6 characters
}
```

- `Notes`
- Password is automatically hashed before storage
- JWT token is generated upon successful registration
- Email must be unique in the system


## Login User Endpoint

### `POST /user/login`

### Description

- Authenticates a user and provides a JWT token for subsequent requests.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Request

```json
{
  "email": "string", // required, valid email format
  "password": "string" // required, min 6 characters
}
```

### Example Response

Success response will include the user object and an authentication token:

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
- `email` (string): User's email address (must be a valid email).
- `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  },
  "token": "string" // JWT token
}
```

### Notes

- Invalid credentials will return a 401 Unauthorized response
- Successful login provides a JWT token for authentication
- Password is verified against the hashed version stored in the database
