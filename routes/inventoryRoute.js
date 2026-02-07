// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build a specific vehicle detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetailView))

// ⭐ Intentional 500 error route
router.get("/trigger-error", utilities.handleErrors(invController.triggerError)
)

// Deliver add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification)
)

// Process add classification
router.post("/add-classification", 
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Deliver add inventory view
router.get("/add-inventory",
    utilities.handleErrors(invController.buildAddInventory)
)

// Process add inventory
router.post("/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

module.exports = router;