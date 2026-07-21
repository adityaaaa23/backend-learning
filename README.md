# 🌍 Natours API

A RESTful API for a tour booking platform built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

> **Note:** This repository is a **learning and implementation project** created to strengthen my backend development skills. While inspired by a structured learning curriculum, all features were implemented by me to understand real-world backend concepts such as RESTful API design, Express middleware, MongoDB integration, query optimization, and scalable project architecture.

---

## ✨ Features

* RESTful API architecture
* CRUD operations
* Express.js routing
* Custom middleware
* MongoDB integration
* Mongoose models and schemas
* Environment variable configuration
* Advanced API querying

  * Filtering
  * Sorting
  * Field Limiting
  * Pagination
  * Query Aliasing
* Aggregation Pipelines
* Centralized error handling
* MVC Architecture
* Async/Await implementation

---

# 🛠 Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | JavaScript Runtime    |
| Express.js | Backend Framework     |
| MongoDB    | NoSQL Database        |
| Mongoose   | ODM                   |
| dotenv     | Environment Variables |
| Morgan     | HTTP Request Logger   |
| Nodemon    | Development Server    |

---

# 📂 Project Structure

```text
Natours/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── dev-data/
├── public/
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/adityaaaa23/natours-api.git
```

```bash
cd natours-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_password

PORT=3000
NODE_ENV=development
```

---

## Run the Development Server

```bash
npm run start:dev
```

---

# 📌 API Endpoints

## Tours

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/v1/tours`     | Get all tours     |
| GET    | `/api/v1/tours/:id` | Get a single tour |
| POST   | `/api/v1/tours`     | Create a new tour |
| PATCH  | `/api/v1/tours/:id` | Update a tour     |
| DELETE | `/api/v1/tours/:id` | Delete a tour     |

---

# 🔎 Advanced Query Features

## Filtering

```http
GET /api/v1/tours?difficulty=easy&price[lte]=500
```

---

## Sorting

```http
GET /api/v1/tours?sort=price,-ratingsAverage
```

---

## Field Limiting

```http
GET /api/v1/tours?fields=name,price,difficulty
```

---

## Pagination

```http
GET /api/v1/tours?page=2&limit=5
```

---

# 📊 Example Response

```json
{
  "status": "success",
  "results": 9,
  "data": {
    "tours": [
      {
        "name": "The Forest Hiker",
        "duration": 5,
        "difficulty": "easy",
        "price": 397
      }
    ]
  }
}
```

---

# 🎯 Skills Demonstrated

This project allowed me to gain hands-on experience with:

* REST API Design
* Express.js
* MongoDB
* Mongoose ODM
* Middleware
* MVC Architecture
* Async JavaScript
* CRUD Operations
* Error Handling
* Environment Configuration
* Aggregation Pipelines
* API Query Optimization
* Clean Backend Project Structure

---

# 🚧 Current Progress

This project is still in active development as I continue learning advanced backend development.

### Planned Features

* JWT Authentication
* User Authorization
* Reviews API
* Image Uploads
* Geospatial Queries
* Security Best Practices
* Stripe Payment Integration
* Email Functionality
* Deployment

---

# 💡 What I Learned

Working on this project helped me better understand:

* How scalable backend applications are structured
* Building RESTful APIs using Express.js
* Designing MongoDB schemas with Mongoose
* Writing reusable middleware
* Optimizing database queries
* Managing application configuration
* Organizing backend projects using the MVC pattern
* Handling asynchronous operations and errors effectively

---

# 👨‍💻 About Me

## Aditya Pal

**Information Technology Undergraduate**

I'm passionate about Backend Development, REST APIs, Full-Stack Web Development, and continuously improving my software engineering skills through practical projects.

### Connect with Me

* **Email:** adityaaa.pal23@gmail.com
* **LinkedIn:** https://www.linkedin.com/in/aditya-pal-ba0283340

---

# ⭐ Support

If you found this project interesting or helpful, feel free to **star the repository**. Feedback and suggestions are always welcome!

---

## 📜 License

 dont **copy** it (optional) :)
