
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Student.css";

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [enrollingId, setEnrollingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const studentResponse = await api.get("/api/students/profile");
            setStudent(studentResponse.data.student);

            const courseResponse = await api.get("/api/courses");
            setCourses(courseResponse.data.courses || []);
        } catch (err) {
            setError("Unable to load dashboard. Please try again.");
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            setError("");
            setMessage("");

            const response = await api.post("/api/enrollments", {
                courseId
            });

            const enrollmentId = response.data.enrollment?._id;

            if (enrollmentId) {
                navigate(`/student/payment/${enrollmentId}`);
            } else {
                setError("Unable to open payment page.");
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to start enrollment."
            );
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

    return (
        <div className="student-dashboard">

            <nav className="student-dashboard-nav">
                <h2 className="dashboard-logo">
                    Course<span>Hub</span>
                </h2>

                <div className="dashboard-nav-right">
                    <button
                        className="my-enrollments-nav-btn"
                        onClick={() => navigate("/student/my-enrollments")}
                    >
                        My Enrollments
                    </button>

                    <span className="student-nav-name">
                        {student?.name}
                    </span>

                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <main className="student-dashboard-content">

                {student && (
                    <section className="student-welcome">
                        <div className="welcome-text">
                            <span className="welcome-label">
                                STUDENT DASHBOARD
                            </span>

                            <h1>Welcome back, {student.name}!</h1>

                            <p>
                                Learn new skills, explore courses and
                                take the next step in your career.
                            </p>
                        </div>

                        <div className="student-profile-card">
                            <div className="student-avatar">
                                {student.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h3>{student.name}</h3>
                                <p>{student.email}</p>
                                <p>📞 {student.phone}</p>
                            </div>
                        </div>
                    </section>
                )}

                <section className="available-courses-section">

                    <div className="courses-heading">
                        <div>
                            <span className="section-label">
                                START LEARNING
                            </span>

                            <h2>Explore Our Courses</h2>

                            <p>
                                Discover courses designed to help you
                                achieve your goals.
                            </p>
                        </div>

                        <div className="course-count">
                            {courses.length} Courses Available
                        </div>
                    </div>

                    {message && (
                        <div className="enrollment-success">
                            {message}
                            <button
                                onClick={() =>
                                    navigate("/student/my-enrollments")
                                }
                            >
                                View Enrollments
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="student-error">{error}</p>
                    )}

                    <div className="student-dashboard-courses">

                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <div
                                    className="student-course-card"
                                    key={course._id}
                                >

                                    <div className="course-image-wrapper">
                                        {course.image ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${course.image}`}
                                                alt={course.courseName}
                                            />
                                        ) : (
                                            <div className="course-image-placeholder">
                                                CourseHub
                                            </div>
                                        )}

                                        <span className="course-category-badge">
                                            {course.category}
                                        </span>
                                    </div>

                                    <div className="student-course-details">

                                        <h3>{course.courseName}</h3>

                                        <p className="course-description">
                                            {course.description}
                                        </p>

                                        <div className="course-information">
                                            <div>
                                                <span>👨‍🏫</span>
                                                <p>
                                                    <strong>Educator</strong>
                                                    {course.educator}
                                                </p>
                                            </div>

                                            <div>
                                                <span>⏱️</span>
                                                <p>
                                                    <strong>Duration</strong>
                                                    {course.duration}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="course-card-footer">
                                            <div className="course-price">
                                                <small>Course Price</small>
                                                <h2>₹{course.price}</h2>
                                            </div>

                                            <button
                                                disabled={enrollingId === course._id}
                                                onClick={() =>
                                                    handleEnroll(course._id)
                                                }
                                            >
                                                {enrollingId === course._id
                                                    ? "Enrolling..."
                                                    : "Enroll Now →"}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-courses">
                                <h3>No Courses Available</h3>
                                <p>
                                    New courses will be added soon.
                                </p>
                            </div>
                        )}

                    </div>
                </section>
            </main>

            <footer className="student-dashboard-footer">
                © 2026 CourseHub. All rights reserved.
            </footer>

        </div>
    );
};

export default StudentDashboard;
