#  JWT Authentication API

A Node.js backend application implementing **User Authentication & Authorization** using **JWT (JSON Web Tokens)**, **Express.js**, and **MongoDB (Mongoose)** following the **MVC architecture**.

---

##  Features

* User Registration (Signup)
* User Login with JWT
* Password hashing using bcrypt
* Protected routes using middleware
* MongoDB Atlas integration
* MVC folder structure
* Environment-based configuration

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcryptjs
* dotenv

---

##  Project Structure

```
auth-project/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

##  Installation

```bash
git clone <your-repo-url>
cd auth-project
npm install
```

---

##  Environment Variables

Create a `.env` file in root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  Run the Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

##  API Endpoints

###  Register User

* **POST** `/api/auth/register`

```json
{
  "username": "jeffri",
  "email": "jeffri@gmail.com",
  "password": "123456"
}
```

---

###  Login User

* **POST** `/api/auth/login`

```json
{
  "email": "jeffri@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN"
}
```

---

###  Get Profile (Protected)

* **GET** `/api/auth/profile`

**Headers:**

```
Authorization: Bearer YOUR_TOKEN
```

---

##  JWT Authentication Flow

1. User registers → data stored in MongoDB
2. User logs in → server generates JWT
3. Client stores token
4. Token sent in Authorization header
5. Middleware verifies token → access granted

---

##  Security Notes

* Passwords are hashed using bcrypt
* JWT_SECRET should be strong and private
* `.env` file should not be committed
* Token expires in 1 hour

---

##  Testing

Use Postman:

1. Register user
2. Login and copy token
3. Access protected route using Bearer token

---

##  Future Improvements

* Refresh Token system
* Role-based authorization (Admin/User)
* Email validation & verification
* Rate limiting & security enhancements
* Frontend integration (React)

---

