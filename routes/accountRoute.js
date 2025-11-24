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
router.get("/", utilities.checkLogin, utilities.handleErrors(invController.buildManagement))
router.get("/account",  utilities.handleErrors(accountController.buildAccount))

// Management routes
router.get("/add-classification", utilities.checkLogin, utilities.handleErrors(invController.buildClassification))
router.get("/add-inventory", utilities.checkLogin, utilities.handleErrors(invController.buildInventory))

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
  utilities.checkLogin,
  manValidate.classificationRules(),
  manValidate.checkClassData,
  utilities.handleErrors(invController.addClassification)
)

// Process new inventory item 
router.post(
    "/add-inventory", 
    utilities.checkLogin,
    manValidate.inventoryRules(), 
    manValidate.checkInvData, 
    utilities.handleErrors(invController.addInventory))

module.exports = router