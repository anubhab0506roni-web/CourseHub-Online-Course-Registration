
const Course = require("../models/courseModel");

// ADD COURSE
const addCourse = async (req, res) => {
    try {
        const {
            courseName,
            description,
            price,
            educator,
            duration,
            category
        } = req.body;

        if (
            !courseName ||
            !description ||
            price === undefined ||
            !educator ||
            !duration ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid course price"
            });
        }

        const course = await Course.create({
            courseName,
            description,
            price: numericPrice,
            educator,
            duration,
            category,
            image: req.file
                ? `/uploads/${req.file.filename}`
                : ""
        });

        res.status(201).json({
            success: true,
            message: "Course added successfully",
            course
        });

    } catch (error) {
        console.error("Add Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add course"
        });
    }
};


// GET ALL COURSES
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch courses"
        });
    }
};


// GET SINGLE COURSE
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid course ID"
        });
    }
};


// UPDATE COURSE
const updateCourse = async (req, res) => {
    try {
        const {
            courseName,
            description,
            price,
            educator,
            duration,
            category
        } = req.body;

        const updates = {};

        if (courseName !== undefined) updates.courseName = courseName;
        if (description !== undefined) updates.description = description;
        if (educator !== undefined) updates.educator = educator;
        if (duration !== undefined) updates.duration = duration;
        if (category !== undefined) updates.category = category;

        if (price !== undefined) {
            const numericPrice = Number(price);

            if (!Number.isFinite(numericPrice) || numericPrice < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Enter a valid course price"
                });
            }

            updates.price = numericPrice;
        }

        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        console.error("Update Course Error:", error);

        res.status(400).json({
            success: false,
            message: "Unable to update course"
        });
    }
};


// DELETE COURSE
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(
            req.params.id
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete course"
        });
    }
};


module.exports = {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
