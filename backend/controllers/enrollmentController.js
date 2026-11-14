
const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");

// Enroll student in a course
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.student.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required"
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existingEnrollment) {
      if (existingEnrollment.paymentStatus === "Pending") {
        return res.status(200).json({
          success: true,
          message: "Payment is pending for this course",
          enrollment: existingEnrollment,
          alreadyPending: true
        });
      }

      return res.status(400).json({
        success: false,
        message: "You have already registered for this course"
      });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      paymentStatus: "Pending",
      status: "Active"
    });

    res.status(201).json({
      success: true,
      message: "Course added. Please complete payment to register.",
      enrollment
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already enrolled in this course"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const confirmDemoPayment = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const { enrollmentId } = req.params;

    // Check payment method
    const allowedMethods = ["UPI", "Card", "NetBanking"];

    if (!allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    // Find enrollment belonging to the logged-in student
    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: req.student.id
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    // Prevent duplicate payment confirmation
    if (enrollment.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment has already been completed"
      });
    }

    if (enrollment.paymentStatus !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "This enrollment cannot be paid"
      });
    }

    // Simulate successful demo payment
    enrollment.paymentStatus = "Paid";
    enrollment.paymentMethod = paymentMethod;
    enrollment.paidAt = new Date();

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Demo payment successful! You are now registered.",
      enrollment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// Get logged-in student's enrollments
const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.student.id,
            paymentStatus: "Paid"
            })
            .populate("course")
            .sort({ enrollmentDate: -1 });
        return res.status(200).json({
            success: true,
            count: enrollments.length,
            enrollments
        });

    } catch (error) {
        console.error("Get Enrollments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch enrollments."
        });
    }
};
const getPendingEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: req.student.id,
      paymentStatus: "Pending"
    }).populate("course");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Pending enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      enrollment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
    enrollCourse,
    getMyEnrollments,
    confirmDemoPayment,
    getPendingEnrollment
};
