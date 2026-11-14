const jwt = require("jsonwebtoken");

const studentAuth = (req, res, next) => {
    try {
        const token = req.cookies.studentToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Student access only."
            });
        }

        req.student = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired login session."
        });
    }
};

module.exports = studentAuth;