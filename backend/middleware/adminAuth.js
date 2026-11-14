
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check admin role
        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // Store admin information
        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again."
        });
    }
};

module.exports = adminAuth;
