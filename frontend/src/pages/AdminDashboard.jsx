
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Admin.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalRegistrations: 0
    });

    useEffect(() => {

        const getAdmin = async () => {
            try {
                const response = await api.get(
                    "/api/admin/profile"
                );

                setAdmin(response.data.admin);

            } catch (error) {
                navigate("/admin/login", { replace: true });
            }
        };

        getAdmin();

    }, [navigate]);
    useEffect(() => {
        fetchDashboardStats();
    }, []);
    const handleLogout = async () => {
        try {
            await api.post("/api/admin/logout");

            navigate("/admin/login", {
                replace: true
            });

        } catch (error) {
            alert("Unable to logout. Please try again.");
        }
    };
    const fetchDashboardStats = async () => {
        try {
            const response = await api.get(
                "/api/admin-management/dashboard-stats"
            );

            if (response.data.success) {
                setStats(response.data.stats);
            }

        } catch (error) {
            console.error(
                "Unable to fetch dashboard statistics:",
                error.response?.data?.message || error.message
            );
        }
    };
    if (!admin) {
        return <div className="loading-screen">Loading dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                <h2>Course<span>Hub</span></h2>

                <p className="sidebar-title">ADMIN PANEL</p>

                <nav>
                    <a className="active" href="/admin/dashboard">
                        🏠 Dashboard
                    </a>

                    <a
                        href="/admin/manage-courses"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/admin/manage-courses");
                        }}
                    >
                        📚 Manage Courses
                    </a>

                    <a href="/admin/add-course">
                        ➕ Add Course
                    </a>

                    <a href="/admin/students">
                        👨‍🎓 Students
                    </a>

                    <a href="/admin/registrations">
                        📝 Registrations
                    </a>
                </nav>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>

            <main className="dashboard-content">

                <header className="dashboard-header">

                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome to your administration panel.</p>
                    </div>

                    <div className="admin-info">
                        <span>👤</span>
                        <div>
                            <strong>{admin.username}</strong>
                            <small>Administrator</small>
                        </div>
                    </div>

                </header>

                <section className="welcome-section">
                    <h2>Welcome back, {admin.username}!</h2>
                    <p>
                        Manage your online learning platform
                        from one place.
                    </p>
                </section>

                <section className="stats-container">

                    <div className="stat-card">
                        <span>📚</span>
                        <h3>Total Courses</h3>
                        <h2>{stats.totalCourses}</h2>
                    </div>

                    <div className="stat-card">
                        <span>👨‍🎓</span>
                        <h3>Total Students</h3>
                        <h2>{stats.totalStudents}</h2>
                    </div>

                    <div className="stat-card">
                        <span>📝</span>
                        <h3>Total Registrations</h3>
                        <h2>{stats.totalRegistrations}</h2>
                    </div>

                </section>

                <section className="dashboard-bottom">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <button onClick={() =>
                            navigate("/admin/add-course")
                        }>
                            ➕ Add New Course
                        </button>

                        <button onClick={() =>
                            navigate("/admin/manage-courses")
                        }>
                            📚 Manage Courses
                        </button>

                        <button onClick={() =>
                            navigate("/admin/students")
                        }>
                            👨‍🎓 View Students
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;
