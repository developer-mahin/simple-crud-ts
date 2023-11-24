# Node.js Express MongoDB Project

This project is a basic Node.js Express application with MongoDB for user and order management. It provides RESTful APIs for creating, retrieving, updating, and deleting users, order management.
For order management you can create order not create you can push an order in existing data collection. And you can get orders from user data collection using userId for specific user data. and you can get total price for particular user.

### Install Dependencies / Dependencies that i have used

1. express // for server creation
   - npm install express
2. mongoose // Mongoose ODM for connection building with mongoDB
   - npm install mongoose
3. zod // For validation users data
   - npm install zod
4. bcryptjs // For hashing users password
   - npm install bcryptjs
5. cors // helps you handle CORS-related issues when making requests from different domains
   - npm install cors
6. dotenv // For env variables
   - npm install dotenv
7. http-errors // For throw error and error status code
   - npm install http-errors
8. prettier // For code formation
   - npm install --save-dev prettier
9. eslint // For linting code

- npx eslint --init // config eslint
  - You can setup eslint and prettier from here https://blog.logrocket.com/linting-typescript-eslint-prettier/

### 1. User Management // api

### i. For creating users i used post method

- POST http://localhost:5000/api/users

```json
// in below i am sharing a json data formate for creating user
{
  "userId": 1,
  "username": "linda_brown",
  "password": "sdfdddgfd",
  "fullName": {
    "firstName": "Linda",
    "lastName": "Brown"
  },
  "age": 42,
  "email": "linda.brown@example.com",
  "isActive": true,
  "hobbies": ["yoga", "painting"],
  "address": {
    "street": "987 Oak St",
    "city": "Cityville",
    "country": "USA"
  },
  "orders": [
    {
      "productName": "Product 19",
      "price": 8.99,
      "quantity": 1
    },
    {
      "productName": "Product 20",
      "price": 19.99,
      "quantity": 3
    },
    {
      "productName": "Product 21",
      "price": 190.99,
      "quantity": 31
    }
  ]
}
```

### 2. For Retrieve a list of all users i used get method

- GET http://localhost:5000/api/users

### 3. For Retrieve a specific user by ID

- GET http://localhost:5000/api/users/5

### 4. For Update user information

- PUT http://localhost:5000/api/users/3

```json
//in below i am sharing a json data formate for update user

{
  "fullName": {
    "firstName": "Mahin",
    "lastName": "Khan"
  }
}
```

### 5. For Delete a user

- DELETE http://localhost:5000/api/users/3

### 2. Order Management // api

### 1. Add New Product in Order

- PUT http://localhost:5000/api/users/:userId/orders

```json
//  in below i am sharing a json data formate for creating order or insert an order
{
  "productName": "Smart watch",
  "price": 4546,
  "quantity": 2
}
```

### 2. Retrieve all orders for a specific user

- GET http://localhost:5000/api/users/:userId/orders

### 3. Retrieve all orders for a specific user

- GET http://localhost:5000/api/users/:userId/orders/total-price

### \* And here i have Attached a json file for Postman

- Postman collection json file- https://drive.google.com/file/d/1qmEAiTj1VP_Pl6om3nD4xBJUluIzTG-A/view?usp=drive_link
