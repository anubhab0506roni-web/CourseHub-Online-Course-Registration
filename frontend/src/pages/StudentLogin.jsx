import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Student.css";

function StudentLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post("/api/students/login", formData);

            navigate("/student/dashboard", {
                replace: true
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-auth-page">

            <div className="student-auth-card">

                <Link to="/" className="student-auth-logo">
                    Course<span>Hub</span>
                </Link>

                <h1>Student Login</h1>

                <p className="student-auth-subtitle">
                    Login to access your learning dashboard.
                </p>

                {error && (
                    <div className="student-error">{error}</div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="student-auth-switch">
                    Don't have an account?{" "}
                    <Link to="/student/register">Register here</Link>
                </p>

                <Link to="/" className="student-home-link">
                    ← Back to Home
                </Link>

            </div>
        </div>
    );
}

export default StudentLogin;