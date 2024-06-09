const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//!config to retreive files from env files WE USE DOTENV INSTALL IN TERMINAL
const dotenv = require("dotenv");
dotenv.config();
//!using express
const app = express();
app.use(express.json()); //!ČE HOCEMO DA POST V POSTMANU OPCIJA DELA
app.use(express.urlencoded({ extended: true }));

//!The purpose of this check is to ensure that environment variables are only loaded from a .env file during development or testing, not in a production environment.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port = process.env.PORT || 3000;
//!TO UPORABIMO V MONGODB VARIABLE START ASYNC NAMESTO STRINGA KI GA PRILEPIBMO V ENV FILE
const CONNECTION = process.env.CONNECTION;
//*CUSTOMER ARRAY
const customers = [
  {
    name: "John",
    industry: "Technology",
  },
  { name: "Jane", industry: "Finance" },
  { name: "Jill", industry: "Marketing" },
];

//!retrieve data
app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});
//!add data
app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//!MONGODB FUNCTION TO LOAD
const start = async () => {
  try {
    await mongoose.connect(
      //!moras napisati usernam ter password drugač ne zalaufa server
      CONNECTION
    );
    //!app.listen starta aplication
    app.listen(port, () => {
      console.log(`Example EXPRESS! app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
