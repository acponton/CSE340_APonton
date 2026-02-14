// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController =require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")
const accountValidate = require("../utilities/account-validation")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post("/register", regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

// Default account management view
router.get(
    "/",
    utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement)
)

// Deliver update account view
router.get(
    "/update/:account_id",
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildUpdateAccount)
)

// Process account info update
router.post(
    "/update",
    utilities.checkLogin,
    accountValidate.updateAccountRules(),
    accountValidate.checkUpdateAccountData,
    utilities.handleErrors(accountController.updateAccount)
)

// Process password update
router.post(
    "/update-password",
    utilities.checkLogin,
    accountValidate.updatePasswordRules(),
    accountValidate.checkUpdatePasswordData,
    utilities.handleErrors(accountController.updatePassword)
)

router.get(
    "/logout",
    utilities.handleErrors(accountController.logout)
)

module.exports = router;