const express = require("express");
const app = express();
const path = require("path");

//* DOTENV
require("dotenv").config();

//* CORS BETWEEN API AND APPLICATION
const cors = require("cors");
app.use(cors());

//* ACCES AU CORPS DE LA REQUETE
app.use(express.json());

// //* ACCES AUX ROUTES
const routesUser = require("./routes/routesUser");
app.use("/api/auth", routesUser);
const routesSauce = require("./routes/routesSauce");
app.use("/api/sauces", routesSauce);
app.use("/images", express.static(path.join(__dirname, "images")));

//* MONGOOSE => BDD
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = app;
