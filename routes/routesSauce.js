//* IMPORT CONTROLLERS
const express = require("express");
const router = express.Router();

//* ⚠️ MEP MIDDLEWARE AUTH ET MULTER ⚠️
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const ctrlSauce = require("../controllers/ctrlSauce");
const ctrlLike = require("../controllers/ctrlLike");

//* ROUTES
//POST => CREATE
router.post("/", auth, multer, ctrlSauce.sauceCreated);
router.post("/:id/like", auth, ctrlLike.sauceLike);

//GET => READ
router.get("/", auth, ctrlSauce.sauceReadAll);
router.get("/:id", auth, ctrlSauce.sauceReadOne);

//PUT => UPDATE
router.put("/:id", auth, multer, ctrlSauce.sauceUpdate);

//DELETE => DELETE
router.delete("/:id", auth, ctrlSauce.sauceDelete);

module.exports = router;
