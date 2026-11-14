
const express = require("express");

const router = express.Router();

const {
    adminLogin,
    adminLogout,
    getAdminProfile
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

// Admin login
router.post("/login", adminLogin);

// Admin logout
router.post("/logout", adminLogout);

// Protected admin profile
router.get("/profile", adminAuth, getAdminProfile);

module.exports = router;

