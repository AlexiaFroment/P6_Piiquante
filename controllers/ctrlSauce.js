//* IMPORT SHEMA SAUCE
const sauce = require("../models/Sauce");

//* POST
// router.post("/sauces", auth, ctrlSauce.sauceCreated);
exports.sauceCreated = (req, res, next) => {
  const sauceSend = JSON.parse(req.body.sauce);
  delete sauceSend._id;
  delete sauceSend._userId;

  const sauce = new Sauce({
    ...sauceSend,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(()=> res.status(201).json({message: 'Sauce créée 🎉'}))
  .catch(error => res.status(400).json({error}))
};

// router.post("/sauces/:id/like", (req, res, next) => {});

//* GET
// router.get("/", (req, res, next) => {});
exports.sauceAllRead = (req, res, next) => {};
// router.get("/:id", (req, res, next) => {});
exports.sauceOneRead = (req, res, next) => {};
//* PUT
// router.put("/:id", (req, res, next) => {});
exports.sauceUpdate = (req, res, next) => {};
//* DELETE
// router.delete("/:id", (req, res, next) => {});
exports.sauceDelete = (req, res, next) => {};
