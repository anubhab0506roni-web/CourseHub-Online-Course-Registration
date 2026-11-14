
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Admin.css";

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/admin-management/registrations"
            );

            setRegistrations(response.data.registrations || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load registrations."
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter((item) => {
        const searchText = search.toLowerCase();

        const studentName = item.student?.name?.toLowerCase() || "";
        const studentEmail = item.student?.email?.toLowerCase() || "";
        const courseName = item.course?.courseName?.toLowerCase() || "";
        const registrationId = item._id?.toLowerCase() || "";

        const matchesSearch =
            studentName.includes(searchText) ||
            studentEmail.includes(searchText) ||
            courseName.includes(searchText) ||
            registrationId.includes(searchText);

        const matchesStatus =
            statusFilter === "All" || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };
    const handleStatusChange = async (registrationId, newStatus) => {
    try {
        setUpdatingId(registrationId);

        const response = await api.patch(
        `/api/admin-management/registrations/${registrationId}/status`,
        { status: newStatus }
        );

        if (response.data.success) {
        setRegistrations((previousRegistrations) =>
            previousRegistrations.map((registration) =>
            registration._id === registrationId
                ? { ...registration, status: newStatus }
                : registration
            )
        );
        }

    } catch (error) {
        alert(
        error.response?.data?.message ||
        "Unable to update enrollment status"
        );
    } finally {
        setUpdatingId(null);
    }
    };
    return (
        <div className="admin-registrations-page">

            {/* Header */}
            <header className="admin-registrations-header">
                <div>
                    <h1>Registration Management</h1>
                    <p>Monitor all student course registrations.</p>
                </div>

                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="registration-back-btn"
                >
                    ← Dashboard
                </button>
            </header>

            {/* Summary Cards */}
            <div className="registration-summary-grid">

                <div className="registration-summary-card">
                    <span>📋</span>
                    <div>
                        <p>Total Registrations</p>
                        <h2>{registrations.length}</h2>
                    </div>
                </div>

                <div className="registration-summary-card">
                    <span>🟢</span>
                    <div>
                        <p>Active Registrations</p>
                        <h2>
                            {registrations.filter(
                                item => item.status === "Active"
                            ).length}
                        </h2>
                    </div>
                </div>

                <div className="registration-summary-card">
                    <span>🎓</span>
                    <div>
                        <p>Completed Registrations</p>
                        <h2>
                            {registrations.filter(
                                item => item.status === "Completed"
                            ).length}
                        </h2>
                    </div>
                </div>

            </div>

            {/* Registration Table */}
            <section className="registrations-table-section">

                <div className="registrations-table-heading">
                    <div>
                        <h2>All Registrations</h2>
                        <p>Student enrollment records</p>
                    </div>

                    <button
                        onClick={fetchRegistrations}
                        disabled={loading}
                        className="registration-refresh-btn"
                    >
                        {loading ? "Loading..." : "↻ Refresh"}
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="registration-filters">

                    <input
                        type="text"
                        placeholder="Search student, course or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                </div>

                {error && (
                    <div className="students-error">
                        {error}
                        <button onClick={fetchRegistrations}>
                            Try Again
                        </button>
                    </div>
                )}

                {loading ? (
                    <p className="students-loading">
                        Loading registration records...
                    </p>
                ) : !error && (
                    <div className="registrations-table-wrapper">

                        <table className="registrations-table">

                            <thead>
                                <tr>
                                    <th>Registration ID</th>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Educator</th>
                                    <th>Enrollment Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredRegistrations.length > 0 ? (
                                    filteredRegistrations.map((item) => (
                                        <tr key={item._id}>

                                            <td>
                                                <span className="registration-id">
                                                    {item._id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="registration-student">
                                                    <div className="registration-avatar">
                                                        {item.student?.name
                                                            ?.charAt(0)
                                                            .toUpperCase() || "?"}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {item.student?.name || "Student unavailable"}
                                                        </strong>
                                                        <small>
                                                            {item.student?.email || "-"}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {item.course?.courseName || "Course unavailable"}
                                            </td>

                                            <td>
                                                {item.course?.educator || "-"}
                                            </td>

                                            <td>
                                                {formatDate(item.enrollmentDate)}
                                            </td>

                                            <td>
                                                <select
                                                    className="registration-status-select"
                                                    value={item.status}
                                                    disabled={updatingId === item._id}
                                                    onChange={(e) =>
                                                        handleStatusChange(item._id, e.target.value)
                                                    }
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>

                                                {updatingId === item._id && (
                                                    <small>Updating...</small>
                                                )}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="registration-empty"
                                        >
                                            No matching registrations found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

                <div className="registrations-table-footer">
                    Showing {filteredRegistrations.length} of {registrations.length} registrations
                </div>

            </section>

        </div>
    );
};

export default AdminRegistrations;
