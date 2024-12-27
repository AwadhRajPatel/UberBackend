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

## Get User Profile Endpoint

### `GET /user/profile`

### Description

- Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

- Requires a valid JWT token in the Authorization header or cookies

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
- `email` (string): User's email address (must be a valid email).

- `Notes`
- Requires authentication via JWT token
- Returns 401 Unauthorized if no valid token is provided

## Logout User Endpoint

### POST /user/logout

### Description
- Logsout the current user and blacklist the tocken provided in cookie or headers their JWT token

### HTTP Method

`POST`

### Authentication
- Requires a valid JWT token in the Authorization header or cookies

### Example Response

```json
{
  "message": "Logout successfully"
}
```

- `Notes`
- Clears the authentication cookie
- Blacklists the current token
- Token will no longer be valid for future requests
- Returns 401 Unauthorized if no valid token is provided

## Captain API Documentation

### Register Captain Endpoint

### `POST /captains/register`

### Description
- Registers a new captain by creating a captain account with the provided information.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

- `captain` (object);
  - `fullname` (object):
   - `firstname` (string, required): Captain's first name (minimum 3 characters)
   - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')

### Example Request
```json
{
  "fullname": {
    "firstname": "string", // required, min 3 characters
    "lastname": "string"  // optional
  }, 
  "email": "string", // required, valid email format
  "password": "string", // required, min 6 characters
  "vehicle": {
    "color": "string", // required, min 3 characters
    "plate": "string", // required, min 3 characters
    "capacity": 1, // required, min 1
    "vehicleType": "car" // required, one of: car, motorcycle, auto
  }
}
```
- `Notes`
- Password is automatically hashed before storage
 - JWT token is generated upon successful registration
 -  Email must be unique in the system
- Captain status is set to 'inactive' by default
 -  All vehicle information is required and validated

### Login Captain Endpoint

### `POST /captains/login`

### Description
- Authenticates a captain and provides a JWT token for subsequent requests.

### HTTP Method
`POST`

### Request Body
```json
{
  "email": "string", // required, valid email format
  "password": "string" // required, min 6 characters
}
```
### Get Captain Profile Endpoint

### GET /captains/profile

## Description
 - Retrieves the profile information of the authenticated captain.

### HTTP Method
`GET`

### Authentication
 - Requires valid JWT token in Authorization header or cookies

### Example Response

Success response will include the captain object and an authentication token:

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color (minimum 3 characters).
    - `plate` (string): Vehicle plate number (minimum 3 characters).
    - `capacity` (number): Vehicle passenger capacity (minimum 1).
    - `vehicleType` (string): Type of vehicle (must be 'car', 'motorcycle', or 'auto').
  - `status` (string): Captain's status.

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": 1,
    "vehicleType": "string"
  },
  "status": "string"
}
```

### Logout Captain Endpoint

## GET /captains/logout

## Description
 - Logs out the captain and invalidates their JWT token

### HTTP Method
`GET`

### Authentication
 - Requires valid JWT token in Authorization header or cookies

## Example Response

```json
{
  "message": "Logout successfully"
}
```
- `Notes`
   - Clears authentication cookie
- Blacklists current token
  - Token becomes invalid for future requests
- Returns 401 if no valid token provided
