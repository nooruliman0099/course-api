# Course REST API

Express.js + MongoDB (Mongoose) + JWT, using modular MVC structure.

**Name:** Noor ul Iman
**Roll No:** SU92-BSCSM-F24-125

## Run
1. `npm install`
2. Copy `.env.example` to `.env`
3. Start MongoDB
4. `npm run dev`

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
