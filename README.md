# Course REST API

Express.js REST API using modular MVC structure with JWT authentication.
**No database is used.** Data is stored in memory (arrays) and is cleared when the server restarts.

## Run
1. `npm install`
2. Copy `.env.example` to `.env`
3. `npm run dev`

## Folder structure
```
server.js
src/
  app.js
  config/        (settings)
  data/          (in-memory storage)
  models/        (User, Category, Course)
  controllers/   (authController, categoryController, courseController)
  routes/        (authRoutes, categoryRoutes, courseRoutes)
  middleware/    (auth, errorHandler)
```

## Endpoints
| Method | URL | Auth |
|---|---|---|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |
| GET | /api/auth/me | Yes |
| POST | /api/categories | Yes |
| GET | /api/categories | No |
| GET | /api/categories/:id | No |
| PUT | /api/categories/:id | Yes |
| DELETE | /api/categories/:id | Yes |
| POST | /api/courses | Yes |
| GET | /api/courses | No |
| GET | /api/courses/:id | No |
| PUT | /api/courses/:id | Yes |
| DELETE | /api/courses/:id | Yes |

Protected routes need header: `Authorization: Bearer <token>`

## Postman Evidence (Screenshots)

| # | Screenshot | Request | Status |
|---|---|---|---|
| 1 | screenshots/1-register.png | POST /api/auth/register | 201 Created |
| 1 | screenshots/1-login.png | POST /api/auth/login | 200 OK |
| 2 | screenshots/2-post-category.png | POST /api/categories | 201 Created |
| 3 | screenshots/3-get-categories.png | GET /api/categories | 200 OK |
| 4 | screenshots/4-bad-request.png | POST /api/categories (empty body) | 400 Bad Request |
| 5 | screenshots/5-not-found.png | GET /api/categories/123 | 404 Not Found |
