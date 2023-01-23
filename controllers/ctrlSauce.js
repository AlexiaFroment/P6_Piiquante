//* IMPORT SHEMA SAUCE
const Sauce = require("../models/Sauce");

//* INTERACTION AVEC LE SYSTEME DE FICHIERSDU SERVEUR
const fs = require("fs");

//* POST => ⚠️ cours ne fonctionne pas
// router.post("/", auth, ctrlSauce.sauceCreated);
exports.sauceCreated = (req, res, next) => {
  const sauceSend = JSON.parse(req.body.sauce);
  delete sauceSend._id;
  delete sauceSend._userId;

  const sauce = new Sauce({
    ...sauceSend,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée 🎉" }))
    .catch((error) => res.status(400).json({ error }));
};

// router.post("/:id/like", (req, res, next) => {});

//* GET
// router.get("/", (req, res, next) => {});
exports.sauceAllRead = (req, res, next) => {
//   Sauce.find(Sauce)
//     .then((thing) => res.status(200).json(thing))
//     .catch((error) => res.status(404).json({ error }));
};

// router.get("/:id", (req, res, next) => {});
exports.sauceOneRead = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then((thing) => res.status(200).json(thing))
//     .catch((error) => res.status(404).json({ error }));
};

//* PUT => ⚠️ le post fonctionne pas donc ne peux pas tester le PUT
// router.put("/:id", (req, res, next) => {});
// ⚠️ Format de la requête change si l'utilisateur nous envoie un fichier ou non => const sauceSend
exports.sauceUpdate = (req, res, next) => {
  const sauceSend = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceSend._userId;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "non autorisé !" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceSend, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

//* DELETE => ⚠️ le post fonctionne pas donc ne peux pas tester le DELETE
// router.delete("/:id", (req, res, next) => {});
exports.sauceDelete = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "non autorisé" });
      } else {
        const filename = sauce.imageUrl.split("/images/"[1]);
        fs.unlink(`images/$(filename)`, () => {
          Sauce.deleteOne({ _id: req.params.id }).then(() => {
            res
              .status(200)
              .json({ message: "Sauce supprimée !" })
              .catch((error) => res.status(401).json({ error }));
          });
        });
      }
    })
    .catch((error) => {
      res.satus(500).json({ error });
    });
};
