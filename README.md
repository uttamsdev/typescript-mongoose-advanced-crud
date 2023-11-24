# Assignment 2
This is assignment 2 of programming hero next level web development.

## Run Locally
```bash
git clone https://github.com/uttamsaha/assignment-2.git
cd assignment-2
npm install
```

### Set .env variable
```bash
Create a .env file
NODE_ENV = development
PORT = 5000
DATABASE_URL= Put database connection here
BCRYPT_SALT_ROUNDS= Enter number of salt round
```
### To run project
```bash
npm run start:dev
```
### Eslint and prettier 
```bash
npm run lint
npm run lint:fix
npm run prettier
npm run prettier fixed
npm run build (to convert ts to js format)
```

## API
## 1. Create new user
* <b>Endpoint: POST /api/users</b>
* Request body
```bash
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

* Response
```bash
{
    "success": true,
    "message": "User created successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 2. Get all users
* <b>Endpoint: GET /api/users</b>
* Response
```bash
{
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "username": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "age": "number",
            "email": "string",
            "address": {
                "street": "string",
                "city": "string",
                "country": "string"
            }
        },
        // more objects...
    ]
}
```

## 3. Retrieve a specific user by ID
#### Endpoint: GET /api/users/:userId
* Response
```bash
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 4. Update User Information
#### Endpoint: PUT /api/users/:userId
* Response
```bash
{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 5. Delete a user
#### Endpoint: DELETE /api/users/:userId

* Response 
```bash
{
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
}
```

## 6. Add New Product in Order
#### Endpoint: PUT /api/users/:userId/orders
* Request Body
```bash
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
```
* Response 
```bash
{
    "success": true,
    "message": "Order created successfully!",
    "data": null
}
```

## 7. Retrieve all orders for a specific user
#### Endpoint: GET /api/users/:userId/orders
* Response 
```bash
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
            {
                "productName": "Product 1",
                "price": 23.56,
                "quantity": 2
            },
            {
                "productName": "Product 2",
                "price": 23.56,
                "quantity": 5
            }
        ]
    }
}
```

## 8. Calculate Total Price of Orders for a Specific User
#### Endpoint: GET /api/users/:userId/orders/total-price
* Response 
```bash
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 454.32
    }
}
```

## Sample Error message
```bash
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```