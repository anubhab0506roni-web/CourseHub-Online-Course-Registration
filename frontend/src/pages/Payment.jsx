
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Payment.css";

const Payment = () => {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();

    const [enrollment, setEnrollment] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPendingEnrollment = async () => {
            try {
                const response = await api.get(
                    `/api/enrollments/pending/${enrollmentId}`
                );

                setEnrollment(response.data.enrollment);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load payment details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPendingEnrollment();
    }, [enrollmentId]);

    const handlePayment = async () => {
        try {
            setPaying(true);
            setError("");

            const response = await api.post(
                `/api/enrollments/${enrollmentId}/pay`,
                { paymentMethod }
            );

            if (response.data.success) {
                alert("Demo payment successful! You are now registered.");

                navigate("/student/my-enrollments");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Payment could not be completed."
            );
        } finally {
            setPaying(false);
        }
    };

    if (loading) {
        return <div className="payment-message">Loading payment details...</div>;
    }

    if (error && !enrollment) {
        return (
            <div className="payment-message">
                <p>{error}</p>
                <button onClick={() => navigate("/student/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!enrollment) return null;

    const course = enrollment.course;

    return (
        <div className="payment-page">

            <div className="payment-container">

                <header className="payment-header">
                    <h1>CourseHub Payment</h1>
                    <p>Complete your demo payment to register for the course.</p>
                </header>

                <div className="payment-content">

                    <section className="payment-course-card">
                        <h2>Order Summary</h2>

                        <h3>{course?.courseName || "Course"}</h3>

                        <p>
                            Educator: {course?.educator || "Not specified"}
                        </p>

                        <p>
                            Duration: {course?.duration || "Not specified"}
                        </p>

                        <div className="payment-total">
                            <span>Total Amount</span>
                            <strong>₹{course?.price ?? 0}</strong>
                        </div>

                        <p className="pending-payment-label">
                            Payment Pending
                        </p>
                    </section>

                    <section className="payment-method-card">

                        <h2>Select Payment Method</h2>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={paymentMethod === "UPI"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            <span>📱 UPI</span>
                            <small>Google Pay / PhonePe / Paytm (Demo)</small>
                        </label>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={paymentMethod === "Card"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            <span>💳 Credit / Debit Card</span>
                            <small>Visa / Mastercard / RuPay (Demo)</small>
                        </label>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="NetBanking"
                                checked={paymentMethod === "NetBanking"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            <span>🏦 Net Banking</span>
                            <small>All major banks (Demo)</small>
                        </label>

                        {error && (
                            <p className="payment-error">{error}</p>
                        )}

                        <button
                            className="pay-now-btn"
                            onClick={handlePayment}
                            disabled={paying}
                        >
                            {paying
                                ? "Processing..."
                                : `Pay Now - ₹${course?.price ?? 0}`}
                        </button>

                        <p className="demo-payment-note">
                            Demo interface only. No real payment will be made.
                        </p>

                        <button
                            className="payment-back-btn"
                            onClick={() => navigate("/student/dashboard")}
                            disabled={paying}
                        >
                            Back to Dashboard
                        </button>

                    </section>

                </div>

            </div>

        </div>
    );
};

export default Payment;
