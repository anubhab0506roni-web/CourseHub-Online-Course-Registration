const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getAllRegistrations,
  updateEnrollmentStatus,
  getDashboardStats
} = require("../controllers/adminManagementController");

const adminAuth = require("../middleware/adminAuth");

// Get all students
router.get("/students", adminAuth, getAllStudents);

// Get all registrations
router.get("/registrations", adminAuth, getAllRegistrations);

// Update enrollment status
router.patch(
  "/registrations/:id/status",
  adminAuth,
  updateEnrollmentStatus
);

// Dashboard Statistics
router.get("/dashboard-stats", adminAuth, getDashboardStats);
module.exports = router;