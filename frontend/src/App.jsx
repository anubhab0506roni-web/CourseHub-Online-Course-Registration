
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCourse from "./pages/AddCourse";
import ManageCourses from "./pages/ManageCourses";
import EditCourse from "./pages/EditCourse";
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProtectedRoute from "./components/StudentProtectedRoute";
import MyEnrollments from "./pages/MyEnrollments";
import AdminStudents from "./pages/AdminStudents";
import AdminRegistrations from "./pages/AdminRegistrations";
import Payment from "./pages/Payment";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Home Page */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Admin Login */}
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Protected Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/add-course"
                    element={
                        <ProtectedRoute>
                            <AddCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/manage-courses"
                    element={
                        <ProtectedRoute>
                            <ManageCourses />
                        </ProtectedRoute>
                    }
                />              
                <Route
                    path="/admin/edit-course/:id"
                    element={
                        <ProtectedRoute>
                            <EditCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/register"
                    element={<StudentRegister />}
                />

                <Route
                    path="/student/login"
                    element={<StudentLogin />}
                />
                <Route
                    path="/student/dashboard"
                    element={
                        <StudentProtectedRoute>
                            <StudentDashboard />
                        </StudentProtectedRoute>
                    }
                />
                <Route
                    path="/student/my-enrollments"
                    element={
                        <StudentProtectedRoute>
                            <MyEnrollments />
                        </StudentProtectedRoute>
                    }
                />
                <Route
                    path="/admin/students"
                    element={
                        <ProtectedRoute>
                            <AdminStudents />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/registrations"
                    element={
                        <ProtectedRoute>
                            <AdminRegistrations />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/payment/:enrollmentId"
                    element={
                        <StudentProtectedRoute>
                            <Payment />
                        </StudentProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
