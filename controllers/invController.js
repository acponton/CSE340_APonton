const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
    const inv_id = req.params.inv_id

    // Get the specific vehicle
    const vehicleData = await invModel.getVehicleById(inv_id)

    // If no vehicle found, redirect with a message
    if (!vehicleData) {
        req.flash("notice", "Sorry, that vehicle could not be found.")
        return res.redirect("/inventory")
    }

    // Build the HTML for the detail page
    const detailHTML = await utilities.buildDetailHTML(vehicleData)

    // Build the nav
    let nav = await utilities.getNav()

    // Page title: Make + Model
    const title = `${vehicleData.inv_make} ${vehicleData.inv_model}`

    // Render the view
    res.render("./inventory/detail", {
        title,
        nav,
        detailHTML,
    })
}

/* ***************************
 *  Intentional 500 Error (Task 3)
 * ************************** */
invCont.triggerError = async function (req, res, next) {
    throw new Error("Intentional 500 error for testing purposes")
}

module.exports = invCont