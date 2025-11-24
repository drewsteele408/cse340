const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const managementModel = require("../models/management-model")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
 if (!data || data.length === 0) {
  req.flash("notice", "No items found in this classification.")
  return res.redirect("/inv")
}
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory single item view
 * ************************** */
invCont.buildItemDetail = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getItemDetail(inv_id)
  const grid = await utilities.buildItemGrid(data)
  let nav = await utilities.getNav()

  const itemName = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
  
  res.render("./inventory/detail", {
    title: itemName, 
    nav, 
    grid,
  })

}

/* ***************************
 *  Deliver management view
 * ************************** */
 invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management",
    nav, 
  })

}


/* ***************************
 *  Deliver add classifcation view
 * ************************** */
invCont.buildClassification = async function (req, res, next) {
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
 invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const classResult = await managementModel.addClassification(
    classification_name
  )

  if (classResult) {
    req.flash("notice", `${classification_name} added.`)
    return res.redirect("/account")
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
 invCont.buildInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classifications = await invModel.getClassifications()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav, 
    errors: null,
    classifications: classifications.rows
  })

}

/* ***************************
 *  Process add inventory 
 * ************************** */
 invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, inv_image, inv_thumbnail } = req.body

  const invResult = await managementModel.addInventory(
    classification_id,
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_price, 
    inv_miles, 
    inv_color, 
    inv_image, 
    inv_thumbnail
  )

if (invResult) {
    req.flash("notice", `New Inventory item added.`)
    return res.redirect("/account")
  } else {
    req.flash("notice", "Failed to add new inventory item")
    let classifications = await invModel.getClassifications()
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: classifications.rows
    })
  }
}



module.exports = invCont