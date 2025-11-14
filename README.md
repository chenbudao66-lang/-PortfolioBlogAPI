# Portfolio & Blog API

A comprehensive RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio and blog platform.

## Features

- 🔐 JWT-based authentication and authorization
- 👤 User registration and login
- 📁 Project portfolio management (CRUD)
- 📝 Blog post management with comments
- 📧 Contact form submission
- 🔒 Protected routes for authenticated users
- 🛡️ Secure password hashing with bcrypt
- ✅ Data validation with Mongoose schemas

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet.js, bcryptjs
- **Environment**: dotenv

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd PortfolioBlogAPI
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory (use `.env.example` as template)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. Start the server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The API will be running at `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register new user | Public |
| POST | `/api/users/login` | Login user | Public |
| GET | `/api/users/me` | Get current user | Private |

#### Register User
```json
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```json
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create new project | Private |
| PUT | `/api/projects/:id` | Update project | Private |
| DELETE | `/api/projects/:id` | Delete project | Private |

#### Create Project
```json
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "E-Commerce Website",
  "description": "A full-stack e-commerce platform",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://demo.com",
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create new post | Private |
| PUT | `/api/blog/:id` | Update post | Private (Author) |
| DELETE | `/api/blog/:id` | Delete post | Private (Author) |

#### Create Blog Post
```json
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "content": "Full blog post content here...",
  "excerpt": "A brief introduction to Node.js",
  "tags": ["nodejs", "javascript", "backend"]
}
```

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get all comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create comment on post | Private |

#### Create Comment
```json
POST /api/blog/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "Great article! Thanks for sharing."
}
```

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all messages | Private |

#### Submit Contact Form
```json
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'd love to work with you!"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

After logging in or registering, include the token from the response in all subsequent requests to protected endpoints.

## Data Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)

### Project
- title (String, required)
- description (String, required)
- imageUrl (String, optional)
- repoUrl (String, optional)
- liveUrl (String, optional)
- technologies (Array of Strings)
- user (Reference to User)

### BlogPost
- title (String, required)
- content (String, required)
- excerpt (String)
- author (Reference to User)
- tags (Array of Strings)
- published (Boolean)

### Comment
- body (String, required)
- author (Reference to User)
- post (Reference to BlogPost)

### Message
- name (String, required)
- email (String, required)
- message (String, required)
- read (Boolean)

## Project Structure

```
PortfolioBlogAPI/
├── controllers/        # Request handlers
│   ├── userController.js
│   ├── projectController.js
│   ├── blogController.js
│   └── contactController.js
├── middleware/         # Custom middleware
│   └── authMiddleware.js
├── models/            # Mongoose schemas
│   ├── User.js
│   ├── Project.js
│   ├── BlogPost.js
│   ├── Comment.js
│   └── Message.js
├── routes/            # Route definitions
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   ├── blogRoutes.js
│   └── contactRoutes.js
├── .env.example       # Environment variables template
├── server.js          # App entry point
└── package.json       # Dependencies
```

## Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
CLIENT_URL=<your-frontend-url>
```

## Testing

Use Postman or Thunder Client to test all endpoints:

1. Register a new user
2. Login to get JWT token
3. Use token to access protected routes
4. Test all CRUD operations

## License

ISC

## Author

Your Name
