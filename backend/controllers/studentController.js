const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Student Registration
exports.registerStudent = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters."
            });
        }

        // Check existing student
        const existingStudent = await Student.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Student already registered with this email."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create student
        const student = await Student.create({
            name,
            email: email.toLowerCase().trim(),
            phone,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Student registered successfully!",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone
            }
        });

    } catch (error) {
        console.error("Student Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during student registration."
        });
    }
};


// Student Login
exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password."
            });
        }

        // Find student
        const student = await Student.findOne({
            email: email.toLowerCase().trim()
        });

        if (!student) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: student._id,
                role: "student"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store token in HTTP-only cookie
        res.cookie("studentToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Student login successful!",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone
            }
        });

    } catch (error) {
        console.error("Student Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during student login."
        });
    }
};


// Student Logout
exports.logoutStudent = (req, res) => {
    res.clearCookie("studentToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        success: true,
        message: "Student logged out successfully."
    });
};


// Get Student Profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id)
            .select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        return res.status(200).json({
            success: true,
            student
        });

    } catch (error) {
        console.error("Student Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch student profile."
        });
    }
};