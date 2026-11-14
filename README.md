# CourseHub – Online Course Registration System

A full-stack Online Course Registration System built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The platform allows students to explore courses, register for accounts, enroll in courses, and complete a simulated payment process. It also provides an admin dashboard to manage courses, students, and registrations.

---

## 1. Project Overview

**CourseHub** is a web-based platform designed to simplify the process of online course management and registration.

The system provides two main user roles:

- **Admin:** Can manage courses, view registered students, monitor course registrations, and update enrollment statuses.
- **Student:** Can create an account, log in, browse available courses, enroll in courses, complete demo payments, and view registered courses.

The project uses a RESTful API architecture to connect the React frontend with the Node.js and Express backend, while MongoDB stores application data.

## 2. Objectives

- Develop an online platform for course registration.
- Provide secure authentication for administrators and students.
- Allow administrators to add, update, view, and delete courses.
- Allow students to browse and enroll in available courses.
- Implement a demonstration payment interface.
- Maintain student and enrollment records.
- Provide an admin dashboard with registration statistics.
- Simplify the management of online educational courses.

## 3. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- REST API
- JSON Web Token (JWT)
- bcryptjs
- Multer
- Cookie Parser
- CORS

### Database
- MongoDB
- Mongoose
- MongoDB Compass

### Development Tools
- Visual Studio Code
- Postman
- Git
- GitHub
- npm
- Nodemon

## 4. Main Features

### A. Admin Module

The admin module provides complete control over course management and student registration records.

**Admin Authentication**
- Secure admin login.
- Password hashing using bcryptjs.
- JWT-based authentication.
- HTTP-only authentication cookies.
- Protected admin routes.
- Admin logout functionality.

**Admin Dashboard**
- Total number of courses.
- Total number of registered students.
- Total number of successful course registrations.
- Quick access to important management sections.

**Course Management**
- Add new courses.
- Upload course images.
- View all available courses.
- Edit existing course details.
- Delete courses.
- Manage course information such as:
  - Course name
  - Description
  - Price
  - Educator
  - Duration
  - Category
  - Course image

**Student Management**
- View all registered students.
- View student names and email addresses.
- View contact numbers.
- Search student records.

**Registration Management**
- View successful course registrations.
- Search registrations by student, course, or registration ID.
- Filter registrations by status.
- Update enrollment status:
  - Active
  - Completed
  - Cancelled

### B. Student Module

**Student Authentication**
- Student registration.
- Student login.
- Password hashing.
- JWT-based authentication.
- Protected student dashboard.
- Student logout.

**Student Dashboard**
- View available courses.
- Search and explore courses.
- View course descriptions.
- View educator names and course duration.
- View course prices.
- Enroll in selected courses.

**Course Enrollment**
- Students can initiate enrollment in a course.
- Enrollment records are created with pending payment status.
- Duplicate enrollment is prevented.
- Students must complete the payment process before becoming registered.

**My Enrollments**
- View successfully registered courses.
- View course details.
- View enrollment dates.
- Check enrollment status.

### C. Demo Payment Module

CourseHub includes a simulated payment interface for demonstration purposes.

**Available Payment Methods**
- UPI
- Credit/Debit Card
- Net Banking

**Payment Workflow**
1. Student selects a course.
2. Student clicks the Enroll Now button.
3. A pending enrollment record is created.
4. Student is redirected to the payment page.
5. Student selects a payment method.
6. Student clicks the Pay Now button.
7. The backend confirms the demo payment.
8. Payment status changes from Pending to Paid.
9. The student becomes registered for the course.
10. The course appears in My Enrollments and Admin Registrations.

**Important:** This is a demonstration payment system. It does not process real financial transactions or connect to actual banking services or payment gateways.

---

## 5. Project Architecture

The project follows a client-server architecture.

```text
CourseHub
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── ProtectedRoute.jsx
│       │   └── StudentProtectedRoute.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminLogin.jsx
│       │   ├── AdminStudents.jsx
│       │   ├── AdminRegistrations.jsx
│       │   ├── ManageCourses.jsx
│       │   ├── AddCourse.jsx
│       │   ├── EditCourse.jsx
│       │   ├── StudentRegister.jsx
│       │   ├── StudentLogin.jsx
│       │   ├── StudentDashboard.jsx
│       │   ├── MyEnrollments.jsx
│       │   └── Payment.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── styles/
│       │   ├── global.css
│       │   ├── Admin.css
│       │   ├── Course.css
│       │   ├── Home.css
│       │   ├── Student.css
│       │   └── Payment.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── adminController.js
    │   ├── courseController.js
    │   ├── studentController.js
    │   ├── enrollmentController.js
    │   └── adminManagementController.js
    │
    ├── middleware/
    │   ├── adminAuth.js
    │   ├── studentAuth.js
    │   └── upload.js
    │
    ├── models/
    │   ├── adminModel.js
    │   ├── courseModel.js
    │   ├── studentModel.js
    │   └── enrollmentModel.js
    │
    ├── routes/
    │   ├── adminRoutes.js
    │   ├── courseRoutes.js
    │   ├── studentRoutes.js
    │   ├── enrollmentRoutes.js
    │   └── adminManagementRoutes.js
    │
    ├── uploads/
    ├── app.js
    ├── server.js
    ├── seedAdmin.js
    └── .env
```

*Note: This represents the intended project structure. Keep only the files and folders that actually exist in your implementation.*

---

## 6. Database Design

The project uses MongoDB with four main collections.

### 1. Admin Collection

Stores administrator account information.

| Field | Description |
|---|---|
| username | Admin username |
| password | Hashed password |
| role | Admin role |
| timestamps | Account creation and update dates |

### 2. Student Collection

Stores student account information.

| Field | Description |
|---|---|
| name | Student name |
| email | Student email address |
| phone | Contact number |
| password | Hashed password |
| role | Student role |
| timestamps | Account creation and update dates |

### 3. Course Collection

Stores course information.

| Field | Description |
|---|---|
| courseName | Name of the course |
| description | Course description |
| price | Course price |
| educator | Instructor name |
| duration | Course duration |
| category | Course category |
| image | Uploaded course image |
| timestamps | Creation and update dates |

### 4. Enrollment Collection

Stores student course enrollment and payment information.

| Field | Description |
|---|---|
| student | Reference to Student collection |
| course | Reference to Course collection |
| enrollmentDate | Enrollment date |
| status | Active, Completed, or Cancelled |
| paymentStatus | Pending, Paid, or Failed |
| paymentMethod | UPI, Card, or NetBanking |
| paidAt | Payment confirmation date |
| timestamps | Creation and update dates |

The Enrollment collection uses MongoDB references to connect students with courses. A unique compound index on student and course prevents duplicate enrollment records.

---

## 7. Installation and Setup

Follow these steps to run CourseHub locally.

### Prerequisites

Install the following software:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Compass
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd online-course-registration
```

### Step 2: Backend Setup

Open the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder.

Add the following configuration:

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/course_registration

JWT_SECRET=YOUR_SECURE_RANDOM_SECRET

ADMIN_USERNAME=admin
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
```

Replace the placeholder values with your own secure credentials.

### Step 3: Create the Admin Account

Run the admin seed script:

```bash
node seedAdmin.js
```

This creates the initial administrator account using the credentials configured in the `.env` file.

### Step 4: Start the Backend Server

```bash
npm run dev
```

The backend server should run at:

```text
http://localhost:5000
```

### Step 5: Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The React application should run at:

```text
http://localhost:5173
```

---

## 8. Application Routes

### Public Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/admin/login` | Admin login |
| `/student/register` | Student registration |
| `/student/login` | Student login |

### Admin Routes

| Route | Description |
|---|---|
| `/admin/dashboard` | Admin dashboard |
| `/admin/manage-courses` | Manage courses |
| `/admin/add-course` | Add a new course |
| `/admin/edit-course/:id` | Edit a course |
| `/admin/students` | View registered students |
| `/admin/registrations` | Manage registrations |

### Student Routes

| Route | Description |
|---|---|
| `/student/dashboard` | Student dashboard |
| `/student/payment/:enrollmentId` | Demo payment page |
| `/student/my-enrollments` | View registered courses |

Admin and student dashboard routes are protected using their respective authentication middleware and frontend protected-route components.

---

## 9. Backend API Endpoints

Base URL:

```text
http://localhost:5000
```

### Admin Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/profile` | Get admin profile |

### Course Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get course by ID |
| POST | `/api/courses` | Add a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |

Course creation and updates support image uploads.

### Student Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students/register` | Register student |
| POST | `/api/students/login` | Student login |
| POST | `/api/students/logout` | Student logout |
| GET | `/api/students/profile` | Get student profile |

### Enrollment and Payment

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/enrollments` | Initiate course enrollment |
| GET | `/api/enrollments/my-enrollments` | Get paid enrollments |
| GET | `/api/enrollments/pending/:enrollmentId` | Get pending enrollment |
| POST | `/api/enrollments/:enrollmentId/pay` | Confirm demo payment |

### Admin Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin-management/dashboard-stats` | Get dashboard statistics |
| GET | `/api/admin-management/students` | Get all students |
| GET | `/api/admin-management/registrations` | Get paid registrations |
| PATCH | `/api/admin-management/registrations/:id/status` | Update enrollment status |

Admin and student protected endpoints require the corresponding authentication cookie.

---

## 10. Security Features

- Password hashing using bcryptjs.
- JWT-based authentication.
- HTTP-only authentication cookies.
- Separate admin and student authentication middleware.
- Protected frontend and backend routes.
- Duplicate student email prevention.
- Duplicate course enrollment prevention.
- Student-specific enrollment access.
- Input validation for payment method and enrollment status.
- Restricted course image uploads by file type and size.
- Environment variables for sensitive configuration.

**Note:** The demo payment endpoint simulates successful payment and is not suitable for production financial transactions.

---

## 11. Testing

The backend APIs can be tested using Postman.

Recommended testing scenarios:

1. Register a new student.
2. Log in as a student.
3. View available courses.
4. Initiate course enrollment.
5. Verify that payment status is Pending.
6. Retrieve pending enrollment details.
7. Select a demo payment method.
8. Confirm demo payment.
9. Verify payment status changes to Paid.
10. Check My Enrollments.
11. Log in as admin.
12. Add, update, and delete courses.
13. View all registered students.
14. View successful course registrations.
15. Update enrollment status.
16. Verify admin dashboard statistics.

---

## 12. Future Enhancements

The following features can be added in future versions:

- Real payment gateway integration using Razorpay or Stripe.
- Email confirmation after successful registration.
- OTP-based student verification.
- Course completion tracking.
- Certificate generation after course completion.
- Course reviews and ratings.
- Video lectures and learning materials.
- Student profile editing.
- Forgot password and password reset.
- Advanced admin analytics.
- Search, sorting, and pagination.
- Responsive mobile application.
- Deployment using cloud hosting services.

---

## 13. Limitations

- The current payment interface is only a simulation.
- UPI, card, and net banking selections do not process actual transactions.
- Students become registered after the demo payment confirmation API succeeds.
- Email and SMS notifications are not part of the current implementation.
- Production deployment requires additional security configuration and payment gateway verification.

---

## 14. Conclusion

CourseHub provides a centralized platform for managing online courses and student registrations. It demonstrates the practical implementation of full-stack web development using the MERN stack.

The project combines authentication, CRUD operations, database management, REST APIs, image uploads, enrollment management, and a simulated payment workflow.

It provides practical experience in developing a real-world web application with separate administrative and student interfaces.

---

## 15. Author

**Project Name:** CourseHub – Online Course Registration System

**Technology:** MERN Stack

**Project Type:** Full Stack Web Development

**Database:** MongoDB

**Frontend:** React.js

**Backend:** Node.js and Express.js

---

⭐ If you find this project useful, feel free to explore, modify, and improve it.