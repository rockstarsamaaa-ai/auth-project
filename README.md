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
MONGO_URI=mongodb+srv://admin:pass%40123@cluster0.gqtqfrh.mongodb.net/authDB
JWT_SECRET=7a41acf0fa24821e9125e2368d396df3d8a0da08946a14215bcdc92434661d4b6cc3f4cad37721df7fc85817c89b60685fefaaf8e3fce67b19e69e64b0a63613
```

---

##  Run the Server

```bash
npm start
```

Server will run at:

```
auth-project-q2ds.onrender.com
```

---

##  API Endpoints

###  Register User

* **POST** `https://auth-project-q2ds.onrender.com/api/auth/register`

```json
{
  "username": "jeffri",
  "email": "jeffri@gmail.com",
  "password": "123456"
}
```

---

###  Login User

* **POST** `https://auth-project-q2ds.onrender.com/api/auth/login`

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

* **GET** `https://auth-project-q2ds.onrender.com/api/auth/profile`

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

