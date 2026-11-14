
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const adminManagementRoutes = require("./routes/adminManagementRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded course images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Admin APIs
app.use("/api/admin", adminRoutes);

// Course APIs
app.use("/api/courses", courseRoutes);

//Student apis

app.use("/api/students", studentRoutes);

app.use("/api/enrollments", enrollmentRoutes);

app.use("/api/admin-management", adminManagementRoutes);

// Home API test
app.get("/", (req, res) => {
    res.send("Online Course Registration API is Running!");
});

module.exports = app;
