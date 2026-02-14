// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Inventory management view
router.get("/",
    utilities.checkEmployeeOrAdmin, 
    utilities.handleErrors(invController.buildManagement))

// Deliver add classification view
router.get("/add-classification", 
    utilities.checkEmployeeOrAdmin,
    utilities.handleErrors(invController.buildAddClassification)
)

// Process add classification
router.post("/add-classification", 
    utilities.checkEmployeeOrAdmin,
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Deliver add inventory view
router.get("/add-inventory",
    utilities.checkEmployeeOrAdmin,
    utilities.handleErrors(invController.buildAddInventory)
)

// Process add inventory
router.post("/add-inventory",
    utilities.checkEmployeeOrAdmin,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// Deliver edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.editInventoryView)
)

// Process inventory update
router.post(
    "/update",
    utilities.checkEmployeeOrAdmin,
    invValidate.inventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build a specific vehicle detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetailView))

// Intentional 500 error route
router.get("/trigger-error", utilities.handleErrors(invController.triggerError)
)

// Return inventory JSON for management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;