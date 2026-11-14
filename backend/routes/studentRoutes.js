const express = require("express");
const router = express.Router();

const {
    registerStudent,
    loginStudent,
    logoutStudent,
    getStudentProfile
} = require("../controllers/studentController");

const studentAuth = require("../middleware/studentAuth");

// Public routes
router.post("/register", registerStudent);
router.post("/login", loginStudent);

// Logout
router.post("/logout", logoutStudent);

// Protected route
router.get("/profile", studentAuth, getStudentProfile);

module.exports = router;