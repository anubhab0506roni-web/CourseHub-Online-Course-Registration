import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Course.css";

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        price: "",
        educator: "",
        duration: "",
        category: ""
    });

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch existing course details
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/api/courses/${id}`);

                const course = response.data.course;

                setFormData({
                    courseName: course.courseName || "",
                    description: course.description || "",
                    price: course.price ?? "",
                    educator: course.educator || "",
                    duration: course.duration || "",
                    category: course.category || ""
                });

                setCurrentImage(course.image || "");

            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Unable to load course details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    // Handle text inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle new image
    const handleImageChange = (e) => {
        setImage(e.target.files[0] || null);
    };

    // Update course
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (image) {
                data.append("image", image);
            }

            const response = await api.put(
                `/api/courses/${id}`,
                data
            );

            setMessage(
                response.data.message || "Course updated successfully!"
            );

            setTimeout(() => {
                navigate("/admin/manage-courses");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to update course."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <h2 className="course-loading">Loading course details...</h2>;
    }

    return (
        <div className="course-page">
            <div className="course-form-container">

                <h1>Edit Course</h1>

                <p className="course-subtitle">
                    Update the course information below.
                </p>

                {message && (
                    <div className="course-message">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Course Name</label>
                    <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                    <label>Educator Name</label>
                    <input
                        type="text"
                        name="educator"
                        value={formData.educator}
                        onChange={handleChange}
                        required
                    />

                    <label>Course Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />

                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <label>Current Course Image</label>

                    {currentImage ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL}${currentImage}`}
                            alt="Current course"
                            className="edit-course-image"
                        />
                    ) : (
                        <p>No image uploaded.</p>
                    )}

                    <label>Upload New Image (Optional)</label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleImageChange}
                    />

                    <button type="submit" disabled={saving}>
                        {saving ? "Updating..." : "Update Course"}
                    </button>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/admin/manage-courses")}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditCourse;