
const express = require("express");

const router = express.Router();

const {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

// Public routes - students and visitors can view courses
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected routes - only logged-in admin
router.post("/", adminAuth, upload.single("image"), addCourse);

router.put(
    "/:id",
    adminAuth,
    upload.single("image"),
    updateCourse
);

router.delete("/:id", adminAuth, deleteCourse);

module.exports = router;
