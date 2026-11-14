import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Home.css";

function Home() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch courses from backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get("/api/courses");
                setCourses(response.data.courses || []);
            } catch (err) {
                setError("Unable to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Search courses by name or category
    const filteredCourses = courses.filter((course) => {
        const searchText = search.toLowerCase();

        return (
            course.courseName.toLowerCase().includes(searchText) ||
            course.category.toLowerCase().includes(searchText) ||
            course.educator.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="home-page">

            {/* Navigation Bar */}
            <nav className="home-navbar">

                <Link to="/" className="home-logo">
                    Course<span>Hub</span>
                </Link>

                <div className="home-nav-links">
                    <Link to="/">Home</Link>
                    <a href="#courses">Courses</a>
                    <Link to="/admin/login">Admin</Link>
                    <Link to="/student/register">Student Register</Link>
                    <Link to="/student/login" className="student-login-link">
                        Student Login
                    </Link>
                </div>

            </nav>

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">
                    <p className="hero-tagline">
                        LEARN. GROW. SUCCEED.
                    </p>

                    <h1>
                        Discover Your Potential
                        <br />
                        With <span>CourseHub</span>
                    </h1>

                    <p className="hero-description">
                        Explore quality courses, learn new skills
                        and take the next step in your career.
                    </p>

                    <a href="#courses" className="explore-button">
                        Explore Courses
                    </a>
                </div>

            </section>

            {/* Courses Section */}
            <section className="home-courses-section" id="courses">

                <div className="home-section-heading">
                    <p>OUR LEARNING PROGRAMS</p>
                    <h2>Explore Our Courses</h2>
                    <span>
                        Choose a course and start learning today.
                    </span>
                </div>

                {/* Search */}
                <div className="course-search">
                    <input
                        type="text"
                        placeholder="Search by course, category or educator..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p className="home-status">Loading courses...</p>
                ) : error ? (
                    <p className="home-error">{error}</p>
                ) : filteredCourses.length === 0 ? (
                    <div className="home-no-courses">
                        <h3>No Courses Found</h3>
                        <p>
                            {courses.length === 0
                                ? "Courses will be available soon."
                                : "Try searching with a different keyword."}
                        </p>
                    </div>
                ) : (

                    <div className="home-course-grid">

                        {filteredCourses.map((course) => (

                            <div className="home-course-card" key={course._id}>

                                {course.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${course.image}`}
                                        alt={course.courseName}
                                    />
                                ) : (
                                    <div className="home-no-image">
                                        Course Image
                                    </div>
                                )}

                                <div className="home-course-content">

                                    <span className="home-category">
                                        {course.category}
                                    </span>

                                    <h3>{course.courseName}</h3>

                                    <p className="home-course-description">
                                        {course.description}
                                    </p>

                                    <p>
                                        <strong>Educator:</strong>{" "}
                                        {course.educator}
                                    </p>

                                    <p>
                                        <strong>Duration:</strong>{" "}
                                        {course.duration}
                                    </p>

                                    <div className="home-course-footer">
                                        <h2>₹{course.price}</h2>

                                        <Link
                                            to="/student/login"
                                            className="enroll-button"
                                        >
                                            Enroll Now
                                        </Link>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>

            {/* Footer */}
            <footer className="home-footer">
                <h2>Course<span>Hub</span></h2>
                <p>
                    Learn new skills. Build your future.
                </p>
                <p>
                    © {new Date().getFullYear()} CourseHub. All rights reserved.
                </p>
            </footer>

        </div>
    );
}

export default Home;