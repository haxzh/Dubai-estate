# EstatePro

EstatePro is a premium Dubai real estate broker platform built with React, Vite,
Tailwind CSS v4, Lucide React, Node.js, Express, and MongoDB.

The platform helps freelance brokers:

- Learn Dubai real estate through practical courses.
- Explore illustrative property opportunities.
- Review broker benefits and the intended freelance workflow.
- Register, log in, and access a personal dashboard.
- Manage users, courses, properties, and theme settings through a protected admin panel.

> **Important:** The current property catalogue, prices, course prices, testimonials,
> contact values, and images are demonstration content. Verify all commercial,
> licensing, property, pricing, and commission information before production use.

## Features

### Public website

- EstatePro premium navy, cream, and champagne-gold visual system.
- Responsive navigation and mobile menu.
- Home page with:
  - Hero section
  - How It Works
  - Course preview
  - Property preview
  - Broker benefits
  - Commission and freelance opportunity explanation
  - FAQ accordion
  - Broker registration/contact section
- Separate pages:
  - `/`
  - `/how-it-works`
  - `/courses`
  - `/properties`
  - `/benefits`
  - `/about-us`
- Course detail modal with `Buy Now`.
- Property detail modal with broker enquiry action.
- Course and property filters.
- Sample-data notices for illustrative listings.

### Authentication

- Signup and login pages:
  - `/signup`
  - `/login`
- Password hashing with `bcryptjs`.
- JWT-based authentication.
- Active/inactive account status.
- User roles:
  - `user`
  - `broker`
  - `admin`
- Successful normal-user login redirects to `/dashboard`.
- Successful admin login redirects to `/admin`.
- The personal dashboard displays:
  - User name
  - User email
  - Account type
  - Member date
  - Active status
  - Selected course or property context
  - Course and property recommendations

### Admin panel

The protected admin panel is available at `/admin`.

It includes:

- Dashboard statistics from MongoDB:
  - Total users
  - Active users
  - Total courses
  - Total properties
  - Published properties
- Recent registrations.
- Recent course and property records.
- User listing with search and pagination.
- Course listing with search and pagination.
- Property listing with search and pagination.
- Add user, course, and property forms.
- Delete confirmation.
- Publish/draft status switching for courses and properties.
- Protected theme customization section.
- Responsive sidebar and mobile layout.
- Access-denied handling for non-admin users.

## Technology stack

### Frontend

- React 19
- Vite
- JavaScript
- Tailwind CSS v4
- Lucide React
- CSS custom properties

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- CORS
- dotenv

## Project structure

```text
dubai-estate/
|
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- common/
|   |   |-- layout/
|   |   |-- NewPages/
|   |   |-- Dashboard.jsx
|   |   |-- HomePage.jsx
|   |-- data/
|   |   |-- courses.js
|   |   |-- properties.js
|   |-- pages/
|   |   |-- AdminPage.jsx
|   |   |-- AuthPage.jsx
|   |-- sections/
|   |-- services/
|   |   |-- api.js
|   |-- App.jsx
|   |-- App.css
|   |-- main.jsx
|
|-- server/
|   |-- config/
|   |   |-- db.js
|   |-- middleware/
|   |   |-- auth.js
|   |   |-- authorize.js
|   |   |-- errorHandler.js
|   |-- models/
|   |   |-- User.js
|   |   |-- Course.js
|   |   |-- Property.js
|   |   |-- Theme.js
|   |-- routes/
|   |   |-- authRoutes.js
|   |   |-- adminRoutes.js
|   |   |-- publicRoutes.js
|   |-- scripts/
|   |   |-- createAdmin.js
|   |   |-- seedCatalog.js
|   |   |-- publishCatalog.js
|   |-- index.js
|
|-- index.js
|-- package.json
|-- vite.config.js
|-- README.md
```

## Requirements

Install the following before running the project:

- Node.js 18 or newer.
- npm.
- MongoDB running locally, or a MongoDB Atlas connection string.

Check your versions:

```bash
node --version
npm --version
```

## Installation

Open a terminal in the project directory:

```bash
cd d:\LandingPAge\dubai-estate
npm install
```

## Environment configuration

Create `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/estatepro
JWT_SECRET=replace-this-with-a-long-random-secret
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

### Environment variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | Local MongoDB or MongoDB Atlas connection string. |
| `JWT_SECRET` | Long, private secret used to sign JWTs. |
| `PORT` | Express server port. Defaults to `5000`. |
| `CLIENT_ORIGIN` | Frontend origin allowed by CORS. |
| `VITE_API_URL` | Optional public backend URL for deployed frontend builds. |

Never commit `server/.env` or real secrets to source control.

## Running the project

### Frontend only

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Backend only

```bash
npm run server
```

Backend URL:

```text
http://localhost:5000
```

### Frontend and backend together

```bash
npm run dev:full
```

The Vite development server proxies `/api` requests to `http://localhost:5000`.

### Production build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Admin setup

Admin registration is intentionally not available on the public signup page.
Create the first administrator from the project root:

```bash
npm run create-admin -- admin@example.com "Use-a-long-password" "EstatePro Admin"
```

The command:

- Creates a new admin if the email does not exist.
- Promotes an existing user to `admin` if the email already exists.
- Activates the account.
- Hashes the password before saving it.

Then:

1. Open `http://localhost:5173/login`.
2. Log in using the admin credentials.
3. The application redirects to `http://localhost:5173/admin`.

If a normal user logs in, the application redirects to `/dashboard`.

## Catalogue data

The original frontend catalogue is stored in:

- `src/data/courses.js`
- `src/data/properties.js`

The admin panel reads its counts and records from MongoDB. To copy the existing
illustrative catalogue into MongoDB, run:

```bash
npm run seed-catalog
```

The seed command currently creates:

- 19 illustrative courses.
- 30 illustrative properties.

Duplicate course titles are stored as separate edition records so that no catalogue
entries are silently overwritten.

To publish all existing draft courses and properties:

```bash
npm run publish-catalog
```

### Publishing rules

- `published` courses are returned by `/api/public/courses`.
- `published` properties are returned by `/api/public/properties`.
- `draft` records remain available in the admin panel but are hidden publicly.
- `unavailable` properties remain in admin management but are hidden from public listings.
- New admin course/property forms default to `published`.
- A record can be moved between published and draft from the admin table.

## API reference

### Health

```http
GET /api/health
```

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

Protected requests require:

```http
Authorization: Bearer <jwt-token>
```

### Public content

```http
GET /api/public/courses
GET /api/public/properties
GET /api/public/theme
```

### Admin dashboard

All `/api/admin/*` routes require a valid JWT belonging to an active admin user.

```http
GET /api/admin/stats
```

### Admin users

```http
GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id
```

Supported query parameters for user listing:

```text
?page=1&limit=10&search=name-or-email&role=broker&status=active
```

### Admin courses

```http
GET    /api/admin/courses
POST   /api/admin/courses
PATCH  /api/admin/courses/:id
DELETE /api/admin/courses/:id
```

Supported query parameters:

```text
?page=1&limit=10&search=keyword&status=published
```

### Admin properties

```http
GET    /api/admin/properties
POST   /api/admin/properties
PATCH  /api/admin/properties/:id
DELETE /api/admin/properties/:id
```

Supported query parameters:

```text
?page=1&limit=10&search=dubai&status=published
```

### Theme

```http
GET /api/admin/theme
PUT /api/admin/theme
```

The theme endpoint stores the global color map in MongoDB. The frontend maps saved
values to CSS custom properties such as `--navy`, `--gold`, `--cream`, `--ink`,
`--muted`, and `--line`.

## Security behavior

- Passwords are never stored as plain text.
- Password hashes are excluded from public user responses.
- Admin routes require both authentication and a database role check.
- Account status is checked during login and admin authorization.
- A user cannot delete their own account through admin APIs.
- The last active administrator cannot be deleted.
- Public signup cannot assign an admin role.
- Admin setup is performed through a local CLI command.
- Use a strong production `JWT_SECRET`.
- Use HTTPS and secure deployment settings in production.

## Troubleshooting

### Admin page keeps loading

Check that the backend is running:

```bash
npm run server
```

Then check:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{"status":"ok"}
```

Also verify that:

- MongoDB is running.
- `server/.env` exists.
- `MONGODB_URI` is correct.
- The logged-in account has role `admin`.
- The browser has a valid token in local storage.

### Admin panel says access denied

Promote or create an admin account:

```bash
npm run create-admin -- admin@example.com "Use-a-long-password" "EstatePro Admin"
```

Log out and log in again so a fresh JWT is issued.

### Courses or properties show zero

The admin dashboard reads MongoDB, not only the local JavaScript arrays. Seed the
catalogue:

```bash
npm run seed-catalog
```

### A course or property is not visible publicly

Open the relevant admin tab and check its status:

- `published`: visible publicly.
- `draft`: admin-only.
- `unavailable`: hidden from public properties.

You can publish all draft records with:

```bash
npm run publish-catalog
```

### Port already in use

Change `PORT` in `server/.env`, then update the Vite proxy in `vite.config.js` if
the frontend needs to proxy to a different backend port.

## Production checklist

Before deploying:

- Replace all illustrative property data with verified listings.
- Replace external demonstration images with approved local or licensed assets.
- Verify all course prices and descriptions.
- Configure MongoDB Atlas or a production MongoDB deployment.
- Use a long random `JWT_SECRET`.
- Configure a production `CLIENT_ORIGIN`.
- Serve the application over HTTPS.
- Add rate limiting and request logging.
- Add production image upload storage and validation.
- Add email notifications for broker applications.
- Review privacy policy and terms.
- Verify Dubai licensing and authorization requirements.
- Confirm commission and referral terms with legal and commercial stakeholders.
- Replace placeholder contact information and WhatsApp values.
- Add real testimonials only after written approval.
- Back up MongoDB before production migrations or seed operations.

## Available npm scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run server` | Start the Express/MongoDB backend. |
| `npm run dev:full` | Start frontend and backend together. |
| `npm run build` | Create the production frontend build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint. |
| `npm run create-admin -- ...` | Create or promote an administrator. |
| `npm run seed-catalog` | Seed the illustrative course/property catalogue. |
| `npm run publish-catalog` | Publish existing draft catalogue records. |
