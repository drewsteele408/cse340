// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
// const manController = require("../controllers/manController")
const manValidate = require('../utilities/management-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildItemDetail);

// Route for management views
router.get("/", utilities.handleErrors(invController.buildManagement))
router.get("/add-classification", utilities.handleErrors(invController.buildClassification))
router.get("/add-inventory", utilities.handleErrors(invController.buildInventory))

// Process classification 
router.post(
  "/add-classification",
  manValidate.classificationRules(),
  manValidate.checkClassData,
  utilities.handleErrors(invController.addClassification)
)

// Process new inventory item 
router.post(
    "/add-inventory", 
    manValidate.inventoryRules(), 
    manValidate.checkInvData, 
    utilities.handleErrors(invController.addInventory))



module.exports = router;