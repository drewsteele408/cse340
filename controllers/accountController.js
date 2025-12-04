const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ****************************************
*  Deliver Login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login", 
        nav,
    })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null
  })
}

/* ****************************************
*  Deliver account view
* *************************************** */
async function buildAccount(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/account", {
    title: "Account",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  
  if (account_password === accountData.account_password) {
    delete accountData.account_password
    const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3600 * 1000})
  if (process.env.NODE_ENV === 'development') {
    res.cookie("jwt", accessToken, {httpOnly: true, maxAge: 3600 * 1000})
  } else {
    res.cookie("jwt", accessToken, {httpOnly: true, secure: true, maxAge: 3600 * 1000})
  }
  res.locals.user = accountData
  req.flash("notice", `Welcome ${accountData.account_firstname}!`)
  return res.redirect("/account/account")
  }

  else {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
  }
}

/* ****************************************
 *  Process logout request
 * ************************************ */
async function logout(req, res) {
  res.clearCookie("jwt")  // or clear session
  req.session.user = null
  res.locals.user = null
  req.flash("notice", "You have been logged out.")
  res.redirect("/")
}

/* ****************************************
 *  Deliver update account view 
 * ************************************ */
async function buildUpdateAccount(req, res, next) {
  const account_id = req.params.account_id
  let nav = await utilities.getNav()
  const accountData = await accountModel.getAccountById(account_id)
  
  res.render("account/update-account", {
    title: "Update Account",
    nav,
    errors: null,
    account: accountData
  })
}

/* ****************************************
 *  Process update account 
 * ************************************ */
async function updateAccount(req, res, next) {
  let nav = await utilities.getNav()
  const { account_id, account_firstname, account_lastname, account_email } = req.body
  
  const updateResult = await accountModel.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  )
  
  if (updateResult) {
    req.flash("notice", "Account information updated successfully.")
    res.redirect("/account/account")
  } else {
    req.flash("notice", "Failed to update account.")
    res.redirect("/account/update/" + account_id)
  }
}

/* ****************************************
 *  Change password
 * ************************************ */
async function changePassword(req, res, next) {
  let nav = await utilities.getNav()
  const { account_id, account_password } = req.body
  
  const updateResult = await accountModel.updatePassword(account_id, account_password)
  
  if (updateResult) {
    req.flash("notice", "Password changed successfully.")
    res.redirect("/account/account")
  } else {
    req.flash("notice", "Failed to change password.")
    res.redirect("/account/update/" + account_id)
  }
}


module.exports  = {buildLogin, buildRegister, registerAccount, accountLogin, buildAccount, logout, buildUpdateAccount, updateAccount, changePassword}