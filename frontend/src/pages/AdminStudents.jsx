
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Admin.css";

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/admin-management/students"
            );

            setStudents(response.data.students || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load students."
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter((student) => {
        const searchText = search.toLowerCase();

        return (
            student.name?.toLowerCase().includes(searchText) ||
            student.email?.toLowerCase().includes(searchText) ||
            student.phone?.toLowerCase().includes(searchText)
        );
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="admin-students-page">

            <header className="admin-students-header">
                <div>
                    <h1>Student Management</h1>
                    <p>View and manage all registered students.</p>
                </div>

                <button
                    className="students-back-btn"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Dashboard
                </button>
            </header>

            <div className="students-summary-card">
                <div className="students-summary-icon">👨‍🎓</div>

                <div>
                    <p>Total Registered Students</p>
                    <h2>{students.length}</h2>
                </div>
            </div>

            <section className="students-table-section">

                <div className="students-table-heading">
                    <div>
                        <h2>All Students</h2>
                        <p>Student registration records</p>
                    </div>

                    <button
                        className="students-refresh-btn"
                        onClick={fetchStudents}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "↻ Refresh"}
                    </button>
                </div>

                <div className="students-search-box">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="students-error">
                        {error}
                        <button onClick={fetchStudents}>
                            Try Again
                        </button>
                    </div>
                )}

                {loading ? (
                    <p className="students-loading">
                        Loading student records...
                    </p>
                ) : !error && (
                    <div className="students-table-wrapper">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Registered On</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student._id}>
                                            <td>
                                                <div className="student-table-name">
                                                    <div className="student-table-avatar">
                                                        {student.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <strong>
                                                        {student.name}
                                                    </strong>
                                                </div>
                                            </td>

                                            <td>{student.email}</td>

                                            <td>{student.phone}</td>

                                            <td>
                                                {formatDate(student.createdAt)}
                                            </td>

                                            <td>
                                                <span className="student-active-status">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="students-empty"
                                        >
                                            {search
                                                ? "No matching students found."
                                                : "No students registered yet."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="students-table-footer">
                    Showing {filteredStudents.length} of {students.length} students
                </div>

            </section>
        </div>
    );
};

export default AdminStudents;
