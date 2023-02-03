//* IMPORT CONTROLLERS
const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/ctrlUser");

//* ⚠️ MEP MIDDLEWARE PASSWORD ⚠️
const password = require("../middleware/password");

//* ROUTES
//POST => CREATE
router.post("/signup", password, ctrlUser.signup);
router.post("/login", ctrlUser.login);

module.exports = router;
