// Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')
const manValidate = require('../utilities/management-validation')

// Route to build account 
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
router.get("/account",  utilities.handleErrors(accountController.buildAccount))
router.get("/update/:account_id", utilities.handleErrors(accountController.buildUpdateAccount))

// Management routes
router.get("/add-classification",  utilities.checkAdmin, utilities.handleErrors(invController.buildClassification))
router.get("/add-inventory", utilities.checkAdmin, utilities.handleErrors(invController.buildInventory))
router.get("/", utilities.checkAdmin, utilities.handleErrors(invController.buildManagement))


// Logout route
router.get("/logout", utilities.handleErrors(accountController.logout))

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Process classification 
router.post(
  "/add-classification",
  utilities.checkAdmin,
  manValidate.classificationRules(),
  manValidate.checkClassData,
  utilities.handleErrors(invController.addClassification)
)

// Process new inventory item 
router.post(
    "/add-inventory", 
    utilities.checkAdmin,
    manValidate.inventoryRules(), 
    manValidate.checkInvData, 
    utilities.handleErrors(invController.addInventory))

// Process account update
router.post("/update/:account_id", utilities.handleErrors(accountController.updateAccount))

// Update password
router.post("/change-password",
  regValidate.changePasswordRules(), 
  regValidate.checkPasswordData, 
  utilities.handleErrors(accountController.changePassword))

module.exports = router