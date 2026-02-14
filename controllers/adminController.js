const utilities = require("../utilities")
const adminModel = require("../models/admin-model")

const adminController = {}

adminController.buildAdminDashboard = async function (req, res, next) {
    let nav = await utilities.getNav()

    const accountCount = await adminModel.getAccountCount()
    const inventoryCount = await adminModel.getInventoryCount()
    const classificationCount = await adminModel.getClassificationCount()
    const mostExpensive = await adminModel.getMostExpensiveVehicle()
    const mostCommon = await adminModel.getMostCommonClassification()

    return res.render("admin/dashboard", {
        title: "Admin Dashboard",
        nav,
        errors: null,
        accountCount,
        inventoryCount,
        classificationCount,
        mostExpensive,
        mostCommon
    })
}

module.exports = adminController