const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    enrollmentDate: {
      type: Date,
      default: Date.now
    },

    // Course registration status
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active"
    },

    // Payment information
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid"
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "NetBanking"],
      default: null
    },

    paidAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

enrollmentSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;