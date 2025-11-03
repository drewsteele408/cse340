// Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")

// Route to build account 
router.get("/login", accountController.buildLogin)

module.exports = router