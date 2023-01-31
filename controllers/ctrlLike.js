//* IMPORT SHEMA SAUCE
const Sauce = require("../models/Sauce");

//* POST
// router.post("/:id/like", (req, res, next) => {});
exports.sauceLike = (req, res, next) => {
  //*GET THE SAUCE => FINDONE ON ID
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //*MISE EN PLACE D'UN SWITCH
      switch (req.body.like) {
        case 1:
          //* USERID N'EST PAS DANS LE TABLEAU DES VOTES && USERID LIKE LA SAUCE => FICHE SAUCE MAJ
          if (
            !sauce.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
            //* MAJ BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Like +1" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1:
          //* USERID N'EST PAS DANS LE TABLEAU DES VOTES && USERID DISLIKE LA SAUCE => FICHE SAUCE MAJ
          if (
            !sauce.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
            //* MAJ BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Dislike +1" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0:
          //* USERID EST DANS LE TABLEAU DES USERSLIKED
          console.log("test");
          if (sauce.usersLiked.includes(req.body.userId)) {
            //* MAJ BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Like 0" }))
              .catch((error) => res.status(400).json({ error }));
          }
          //* USERID EST DANS LE TABLEAU DES USERSDISLIKED
          if (sauce.usersDisliked.includes(req.body.userId)) {
            //* MAJ BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Like 0" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        default:
          throw error;
      }
    })

    .catch((error) => res.status(404).json({ error }));
};
