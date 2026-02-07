const utilities = require(".")
const { body, validationResult } = require("express-validator")

const invValidate = {}

/* **********************************
 *  Classification Validation Rules
 * ********************************* */
invValidate.classificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .notEmpty()
            .withMessage("Please provide a classification name.")
            .matches(/^[A-Za-z0-9]+$/)
            .withMessage("Classification name must contain only letters and numbers.")
    ]
}

/* **********************************
 *  Check classification data
 * ********************************* */
invValidate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors,
            classification_name
        })
        return
    }
    next()
}

/* **********************************
 *  Inventory Validation Rules
 * ********************************* */
invValidate.inventoryRules = () => {
    return [
        body("classification_id")
            .notEmpty()
            .withMessage("Please choose a classification."),

        body("inv_make")
            .trim()
            .notEmpty()
            .withMessage("Please provide a make."),

        body("inv_model")
            .trim()
            .notEmpty()
            .withMessage("Please provide a model."),

        body("inv_year")
            .trim()
            .isInt({ min: 1900, max: 2100 })
            .withMessage("Please provide a valid year."),

        body("inv_description")
            .trim()
            .notEmpty()
            .withMessage("Please provide a description."),

        body("inv_image")
            .trim()
            .notEmpty()
            .withMessage("Please provide an image path."),

        body("inv_thumbnail")
            .trim()
            .notEmpty()
            .withMessage("Please provide a thumbnail path."),

        body("inv_price")
            .trim()
            .isFloat({ min: 0 })
            .withMessage("Please provide a valid price."),

        body("inv_miles")
            .trim()
            .isInt({ min: 0 })
            .withMessage("Please provide valid miles."),

        body("inv_color")
            .trim()
            .notEmpty()
            .withMessage("Please provide a color."),
    ]
}

/* **********************************
 *  Check inventory data
 * ********************************* */
invValidate.checkInventoryData = async (req, res, next) => {
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

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(classification_id)

        res.render("inventory/add-inventory", {
            title: "Add Inventory",
            nav,
            classificationList,
            errors,
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
        return
    }
    next()
}

module.exports = invValidate