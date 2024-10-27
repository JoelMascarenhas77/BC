const express = require("express");
const router = express.Router();

const { accounts } = require("./public/js/info.js");

// Middleware to check for the username cookie except on login and logout routes

router.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/logout") {
    return next();
  }

  if (!req.cookies.username) {
    return res.render("login", { accounts });
  }

  next();
});

// Login route to set cookies for username and address
router.post("/login", (req, res) => {
  const acc_name = req.body.vendor;
  const acc_address = accounts[acc_name];

  if (!acc_address) {
    return res.render("login", { accounts, error: "Invalid account name" });
  }

  res.cookie("username", acc_name);
  res.cookie("address", acc_address);

  res.redirect("/home");
});

// Protected route for the home page
router.get("/home", (req, res) => {
  const acc_name = req.cookies.username;
  const acc_address = req.cookies.address;

  res.render("index", { acc_name, acc_address });
});

// Logout route to clear cookies and redirect to the login page
router.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("address");

  res.redirect("/login");
});

module.exports = router;
