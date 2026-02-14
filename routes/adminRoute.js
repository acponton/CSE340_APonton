const express = require("express")
const router = new express.Router()
const adminController = require("../controllers/adminController")
const utilities = require("../utilities")

router.get(
    "/dashboard",
    utilities.checkLogin,          // Only logged-in users
    utilities.checkAdmin,          // Optional: only admins
    adminController.buildAdminDashboard
)

module.exports = router