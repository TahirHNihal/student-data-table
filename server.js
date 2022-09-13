const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const expressLayouts = require("express-ejs-layouts");
const studentRoutes = require("./routes/studentRoutes");

//Environtment Setup
dotenv.config();
const PORT = process.env.PORT || 4000;

//Express Init
const app = express();

//Data Mange
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Folder Static
app.use(express.static("public"));

//EJS Init
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/app");

//Routes
app.use("/", studentRoutes);

//Lister Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
