//* IMPORT PASSWORDVALIDATOR => POUR MISE EN PLACE DE REGLES SUR LE MOT DE PASSE
const passwordValidator = require("password-validator");

//* CREATION DU SCHEMA
const passwordSchema = new passwordValidator();

//* REGLES DU MOT DE PASSE
passwordSchema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(18) // Maximum length 18
  .has()
  .uppercase(2) // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//* VERIFICATION DE LA QUALITE DU MOT DE PASSE
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate(
        `req.body.password`,
        { list: true }
      )}`,
    });
  }
};
