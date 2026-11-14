import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Course.css";

function AddCourse() {
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
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (image) {
                data.append("image", image);
            }

            const response = await api.post("/api/courses", data);

            setMessage(response.data.message);

            setFormData({
                courseName: "",
                description: "",
                price: "",
                educator: "",
                duration: "",
                category: ""
            });

            setImage(null);

            e.target.reset();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to add course. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="course-page">
            <div className="course-form-container">

                <h1>Add New Course</h1>
                <p className="course-subtitle">
                    Enter the details to add a new course.
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
                        placeholder="Enter course name"
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                        required
                    />

                    <label>Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter course price"
                        min="0"
                        required
                    />

                    <label>Educator Name</label>
                    <input
                        type="text"
                        name="educator"
                        value={formData.educator}
                        onChange={handleChange}
                        placeholder="Enter educator name"
                        required
                    />

                    <label>Course Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Example: 3 Months"
                        required
                    />

                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Example: Web Development"
                        required
                    />

                    <label>Course Image</label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleImageChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Adding Course..." : "Add Course"}
                    </button>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/admin/dashboard")}
                    >
                        Back to Dashboard
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddCourse;