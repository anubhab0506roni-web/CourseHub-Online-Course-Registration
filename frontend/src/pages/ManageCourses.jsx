import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Course.css";

function ManageCourses() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all courses from backend
    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/api/courses");

            setCourses(response.data.courses || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load courses."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Delete course
    const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/api/courses/${courseId}`);

            alert("Course deleted successfully!");

            setCourses((previousCourses) =>
                previousCourses.filter(
                    (course) => course._id !== courseId
                )
            );
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to delete course."
            );
        }
    };

    if (loading) {
        return <h2 className="course-loading">Loading courses...</h2>;
    }

    return (
        <div className="manage-course-page">

            <div className="manage-course-header">
                <div>
                    <h1>Manage Courses</h1>
                    <p>View and manage all available courses.</p>
                </div>

                <button
                    onClick={() => navigate("/admin/add-course")}
                >
                    + Add New Course
                </button>
            </div>

            {error && (
                <div className="course-error">
                    {error}
                </div>
            )}

            <div className="course-count">
                Total Courses: {courses.length}
            </div>

            {courses.length === 0 ? (
                <div className="no-courses">
                    <h2>No Courses Found</h2>
                    <p>Please add a new course.</p>
                </div>
            ) : (

                <div className="course-grid">

                    {courses.map((course) => (

                        <div className="course-card" key={course._id}>

                            {course.image ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${course.image}`}
                                    alt={course.courseName}
                                    className="course-card-image"
                                />
                            ) : (
                                <div className="course-no-image">
                                    No Image Available
                                </div>
                            )}

                            <div className="course-card-content">

                                <h2>{course.courseName}</h2>

                                <p className="course-description">
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

                                <p>
                                    <strong>Category:</strong>{" "}
                                    {course.category}
                                </p>

                                <h3 className="course-price">
                                    ₹{course.price}
                                </h3>

                                <div className="course-actions">

                                    <button
                                        className="edit-course-button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-course/${course._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-course-button"
                                        onClick={() =>
                                            handleDelete(course._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        </div>

                    ))}

                </div>
            )}

            <button
                className="manage-back-button"
                onClick={() => navigate("/admin/dashboard")}
            >
                Back to Dashboard
            </button>

        </div>
    );
}

export default ManageCourses;