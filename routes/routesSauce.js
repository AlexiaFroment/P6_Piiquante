//* IMPORT CONTROLLERS
const express = require("express");
const router = express.Router();

//* ⚠️ METTRE EN PLACE L'AUTH LORS DE L'ECRITURE DES ROUTES ⚠️
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const ctrlSauce = require("../controllers/ctrlSauce");

//* ROUTES
//* ⚠️ METTRE EN PLACE L'AUTH LORS DE L'ECRITURE DE TOUTES LES ROUTES ⚠️
//POST => CREATE
router.post("/", auth, multer, ctrlSauce.sauceCreated);
router.post("/:id/like", (req, res, next) => {});

//GET => READ
router.get("/", auth, ctrlSauce.sauceAllRead);
router.get("/:id", auth, ctrlSauce.sauceOneRead);

//PUT => UPDATE
router.put("/:id", auth, multer, ctrlSauce.sauceUpdate);

//DELETE => DELETE
router.delete("/:id", auth, ctrlSauce.sauceDelete);

module.exports = router;
