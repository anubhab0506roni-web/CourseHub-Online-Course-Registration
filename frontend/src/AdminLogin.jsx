
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./services/api";
import "./styles/Admin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/api/admin/login",
                {
                    username,
                    password
                }
            );

            if (response.data.success) {
                navigate("/admin/dashboard", {
                    replace: true
                });
            }

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to login. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">

            <div className="login-container">

                <div className="login-icon">
                    <span>🎓</span>
                </div>

                <h1>Admin Login</h1>

                <p className="login-subtitle">
                    Welcome back! Login to manage your platform.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter admin username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
}

export default AdminLogin;
