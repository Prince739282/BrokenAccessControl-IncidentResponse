# Broken Access Control Prevention System

A web-based cybersecurity project that prevents unauthorized access using JWT authentication, role-based access control, and security incident logging.

## Features

- User registration and login with JWT authentication.
- Password hashing using bcrypt.
- Role-based access control (`user` and `admin`).
- Protection against unauthorized profile access.
- Security incident logging in MongoDB.
- Admin dashboard to monitor security incidents.
- Protected frontend routes.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT, bcryptjs, express-validator

## How It Works

1. Users register and log in to receive an access token.
2. The backend validates the token on protected requests.
3. Authorization checks prevent users from accessing unauthorized resources.
4. Blocked access attempts are recorded in MongoDB.
5. Administrators can review security incidents through the admin dashboard.

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Broken_Access_Control-HCL