
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Student.css";

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await api.get(
                "/api/enrollments/my-enrollments"
            );

            setEnrollments(response.data.enrollments || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load your enrollments."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post("/api/students/logout");
            navigate("/student/login");
        } catch (err) {
            setError("Logout failed. Please try again.");
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="student-dashboard">

            <nav className="student-dashboard-nav">
                <h2 className="dashboard-logo">
                    Course<span>Hub</span>
                </h2>

                <div className="dashboard-nav-right">
                    <button
                        className="my-enrollments-nav-btn"
                        onClick={() => navigate("/student/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <main className="student-dashboard-content">

                <div className="my-enrollments-heading">
                    <span className="section-label">
                        YOUR LEARNING JOURNEY
                    </span>

                    <h1>My Enrollments</h1>

                    <p>
                        View all the courses you have registered for.
                    </p>
                </div>

                {loading && <p>Loading your enrollments...</p>}

                {error && (
                    <p className="student-error">{error}</p>
                )}

                {!loading && !error && enrollments.length === 0 && (
                    <div className="no-courses">
                        <h2>You haven't enrolled in any courses yet.</h2>
                        <p>
                            Explore our courses and start learning today.
                        </p>

                        <button
                            className="browse-courses-btn"
                            onClick={() => navigate("/student/dashboard")}
                        >
                            Browse Courses
                        </button>
                    </div>
                )}

                {!loading && enrollments.length > 0 && (
                    <div className="my-enrollments-grid">

                        {enrollments.map((item) => (
                            <div
                                className="enrollment-card"
                                key={item._id}
                            >

                                {item.course ? (
                                    <>
                                        {item.course.image ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${item.course.image}`}
                                                alt={item.course.courseName}
                                            />
                                        ) : (
                                            <div className="enrollment-image-placeholder">
                                                CourseHub
                                            </div>
                                        )}

                                        <div className="enrollment-card-content">

                                            <span className="enrollment-status">
                                                {item.status}
                                            </span>

                                            <h2>
                                                {item.course.courseName}
                                            </h2>

                                            <p>
                                                {item.course.description}
                                            </p>

                                            <div className="enrollment-info">
                                                <p>
                                                    <strong>Educator:</strong>{" "}
                                                    {item.course.educator}
                                                </p>

                                                <p>
                                                    <strong>Duration:</strong>{" "}
                                                    {item.course.duration}
                                                </p>

                                                <p>
                                                    <strong>Price:</strong>{" "}
                                                    ₹{item.course.price}
                                                </p>

                                                <p>
                                                    <strong>Enrolled on:</strong>{" "}
                                                    {formatDate(item.enrollmentDate)}
                                                </p>
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    <div className="enrollment-card-content">
                                        <p>This course is no longer available.</p>
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </main>

            <footer className="student-dashboard-footer">
                © 2026 CourseHub. All rights reserved.
            </footer>

        </div>
    );
};

export default MyEnrollments;
