const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
    },
  },
  // MESSAGE D'ERREUR POUR PBL EMAIL A METTRE EN PLACE
  // => EMAIL DEJA ENREGISTRE
  // => EMAIL NON VALIDE

  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
