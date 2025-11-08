const utilities = require("../utilities/")
const managementModel = require("../models/management-model")



/* ***************************
 *  Deliver management view
 * ************************** */
 async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management",
    nav, 
  })

}

/* ***************************
 *  Deliver add classifcation view
 * ************************** */
async function buildClassification (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classifcation",
    nav, 
    errors: null
  })
}

/* ***************************
 *  Process add classifcation 
 * ************************** */
 async function addClassification(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const classResult = await managementModel.addClassification(
    classification_name
  )

  if (classResult) {
    req.flash(
      "notice",
      `${classification_name} added.`
    )
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
    })
  } else {
    req.flash("notice", "Failed to add classifcation")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

/* ***************************
 *  Deliver add inventory view
 * ************************** */
 async function buildInventory  (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav, 
    errors: null
  })

}


/* ***************************
 *  Process add inventory 
 * ************************** */
 async function addInventory(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color } = req.body

  const invResult = await managementModel.addInventory(
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_price, 
    inv_miles, 
    inv_color
  )

  if (invResult) {
    req.flash(
      "notice",
      `New Inventory item added.`
    )
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
    })
  } else {
    req.flash("notice", "Failed to add new inventory item")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
    })
  }
}



module.exports = {buildManagement, buildClassification, addClassification, buildInventory, addInventory}