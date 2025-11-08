const pool = require("../database")

/* *****************************
*   Register new classification
* *************************** */
async function addClassification(classification_name){
  try {
    const sql = "INSERT INTO classifcation (classifcation_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Register new inventory
* *************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color){
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color])
  } catch (error) {
    return error.message
  }
}



module.exports = {addClassification, addInventory}