const utilties = require("./index")
    const { body, validationResult } = require("express-validator")
    const validate = {}
const invModel = require("../models/inventory-model")

/*  **********************************
  *  Classifcation Data Validation Rules
  * ********************************* */
  validate.classificationRules = () => {
    return [
      // classification name is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name") // on error this message is sent.
    ]
  }

  /*  **********************************
  *  Inventory Data Validation Rules
  * ********************************* */
   validate.inventoryRules = () => {
    return [
    body("classification_id")
      .notEmpty()
      .withMessage("Please select a classification")
      .isInt()
      .withMessage("Classification must be valid"),
      // make is required and must be string
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a make name"), // on error this message is sent.
        // model is requried and must be string
        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a model name"),
        // year is required 
        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a year"), // on error this message is sent.

        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a description"),

        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide an image path"),

        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide a thumbnail path"),
        // Price is required and must be a number
        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide a price")
            .isNumeric()
            .withMessage("Price must be a number")
            .isFloat({min: 0.01})
            .withMessage("Price must be greater that 0"),
        // miles are required and must be a number 
        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide current miles")
            .isInt({min: 0})
            .withMessage("Miles must be greater that 0"),
        // color is requried and must be a string
        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a color name")

    ]
    
  }


    /* ******************************
 * Check classification data and return errors or continue to management 
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

    /* ******************************
 * Check inventory data and return errors or continue to management 
 * ***************************** */
validate.checkInvData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classifications = await invModel.getClassifications()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory Item",
      nav,
      classifications: classifications.rows,
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_price, 
      inv_miles, 
      inv_color, 
      classification_id
    })
    return
  }
  next()
}

module.exports = validate