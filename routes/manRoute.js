const express = require("express")
const router = new express.Router()
const manController = require("../controllers/manController")
const utilities = require("../utilities/")
const manValidate = require('../utilities/management-validation')

// Route for management views
router.get("/management", utilities.handleErrors(manController.buildManagement))
router.get("/add-classification", utilities.handleErrors(manController.buildClassification))
router.get("/add-inventory", utilities.handleErrors(manController.buildInventory))

// Process classification 
router.post(
  "/add-classification",
  manValidate.classificationRules(),
  manValidate.checkClassData,
  utilities.handleErrors(manController.addClassification)
)

// Process new inventory item 
router.post(
    "/add-inventory", 
    manValidate.inventoryRules(), 
    manValidate.checkInvData, 
    utilities.handleErrors(manController.addInventory))