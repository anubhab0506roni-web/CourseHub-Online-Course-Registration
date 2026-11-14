const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
  confirmDemoPayment,
  getPendingEnrollment
} = require("../controllers/enrollmentController");

const studentAuth = require("../middleware/studentAuth");

// Student requests enrollment
router.post("/", studentAuth, enrollCourse);

// Get paid enrollments of logged-in student
router.get("/my-enrollments", studentAuth, getMyEnrollments);

router.get(
  "/pending/:enrollmentId",
  studentAuth,
  getPendingEnrollment
);
// Confirm demo payment
router.post(
  "/:enrollmentId/pay",
  studentAuth,
  confirmDemoPayment
);

module.exports = router;