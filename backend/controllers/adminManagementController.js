
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");

// Get all registered students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        console.error("Get Students Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch students."
        });
    }
};


// Get all course registrations
const getAllRegistrations = async (req, res) => {
    try {
      const registrations = await Enrollment.find({
        paymentStatus: "Paid"
      })
        .populate("student", "name email phone")
        .populate(
          "course",
          "courseName educator category price duration image"
        )
        .sort({ enrollmentDate: -1 });
        return res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        });

    } catch (error) {
        console.error("Get Registrations Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch registrations."
        });
    }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Active", "Completed", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enrollment status"
      });
    }

    const registration = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment status updated successfully",
      registration
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// Get Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    const totalStudents = await Student.countDocuments();

    const totalRegistrations = await Enrollment.countDocuments({
      paymentStatus: "Paid"
    });

    const stats = {
      totalCourses,
      totalStudents,
      totalRegistrations
    };

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
    getAllStudents,
    getAllRegistrations,
    updateEnrollmentStatus,
    getDashboardStats
};
