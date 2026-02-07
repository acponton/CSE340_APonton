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

/* ****************************************
 *  Deliver Management View
 * *************************************** */
invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null,
    })
}

/* ****************************************
 *  Deliver Add Classification View
 * *************************************** */
invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

/* ****************************************
 *  Process Add Classification
 * *************************************** */
invCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    const result = await invModel.addClassification(classification_name)

    if (result) {
        req.flash("notice", `${classification_name} successfully added.`)
        nav = await utilities.getNav()   // refresh nav to show new classification
        res.status(201).render("inventory/management", {
             title: "Inventory Management",
            nav,
            errors: null,
        })
    }   else {
        req.flash("notice", "Failed to add classification.")
        res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
}

/* ****************************************
 *  Deliver Add Inventory View
 * *************************************** */
invCont.buildAddInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: null,
        inv_make: "",
        inv_model: "",
        inv_year: "",
        inv_description: "",
        inv_image: "",
        inv_thumbnail: "",
        inv_price: "",
        inv_miles: "",
        inv_color: "",
    })
}

/* ****************************************
 *  Process Add Inventory
 * *************************************** */
invCont.addInventory = async function (req, res) {
    let nav = await utilities.getNav()
    const {
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
    } = req.body

    const result = await invModel.addInventory(
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
    )

    if (result) {
        req.flash("notice", `${inv_year} ${inv_make} ${inv_model} successfully added.`)
        nav = await utilities.getNav()
        res.status(201).render("inventory/management", {
            title: "Inventory Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Failed to add inventory.")
        let classificationList = await utilities.buildClassificationList(classification_id)
        res.status(501).render("inventory/add-inventory", {
            title: "Add Inventory",
            nav,
            classificationList,
            errors: null,
            classification_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        })
    }
}

module.exports = invCont