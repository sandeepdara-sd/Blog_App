# MERN Blog Application

## Overview
This is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to create, read, update, and delete blog posts while maintaining session management using Redux. MUI (Material-UI) is used for responsive and modern styling.

## Deployment
The application is live at: [sd-blogapp.vercel.app](https://sd-blogapp.vercel.app/)

## Features
- User authentication (login, logout, signup)
- Create, read, update, and delete blog posts
- Redux-based session management
- Styled with MUI for an enhanced UI/UX
- RESTful API for seamless frontend-backend communication
- Secure authentication and authorization

## Technologies Used
### Frontend
- React.js
- Redux (for session management)
- Material-UI (MUI) for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT) for authentication
- bcrypt for password hashing

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run Locally
#### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/mern-blog-app.git
cd mern-blog-app
```

#### 2. Install Dependencies
##### Backend
```sh
cd backend
npm install
```
##### Frontend
```sh
cd ../frontend
npm install
```

#### 3. Start the Application
##### Backend
```sh
cd backend
npm start
```
##### Frontend
```sh
cd frontend
npm start
```

## API Endpoints
### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Blog Posts
- `GET /api/blogs` - Fetch all blogs
- `GET /api/blogs/:id` - Fetch a single blog post
- `POST /api/blogs` - Create a new blog post
- `PUT /api/blogs/:id` - Update an existing blog post
- `DELETE /api/blogs/:id` - Delete a blog post

## Folder Structure
```
mern-blog-app/
 ├── backend/
 │   ├── models/
 │   ├── routes/
 │   ├── controllers/
 │   ├── app.js
 │
 ├── frontend/
 │   ├── public/
 │   ├── src/
 │   │   ├── assets/
 │   │   ├── components/
 │   │   ├── helper/
 │   │   ├── store/
 │   │   ├── App.css
 │   │   ├── App.js
 │   │   ├── App.test.js
 │   │   ├── index.css
 │   │   ├── index.js
 │   │   ├── logo.svg
 │   │   ├── reportWebVitals.js
 │   │   ├── setupTests.js
 │   ├── .gitignore
 │   ├── package-lock.json
 │   ├── package.json
 │   ├── README.md
```

## Future Enhancements
- Implement comments and likes for blog posts
- Add image uploads for blogs
- Improve SEO with SSR (Server-Side Rendering) using Next.js

## License
This project is licensed under the MIT License.

## Author
[Sandeep Dara](https://github.com/sandeepdara-sd)

