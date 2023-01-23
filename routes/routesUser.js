//* IMPORT CONTROLLERS
const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/ctrlUser");


//* ROUTES
//POST => CREATE
router.post("/signup", ctrlUser.signup);
router.post("/login", ctrlUser.login);

module.exports = router;
