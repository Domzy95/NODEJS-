const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", false);
//!customers je zdaj na voljo v express.js
const Customer = require("./models/customers");
//!config to retreive files from env files WE USE DOTENV INSTALL IN TERMINAL
const dotenv = require("dotenv");
dotenv.config();
//!using express
app.use(cors());
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

//!instance of schema

const customer = new Customer({
  name: "Domen",
  industry: "Technology",
});

//!potem to vnesemo v app.get
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//!shranmo v databazo z customer.save ampak vsakič ko shranimo kodo vnese v databazo novega customerja zato se posledično to neuporabi!
// customer.save();
//!retrieve data
app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//!getting customer for a specific customer ID

app.get("/api/customers/:id/", async (req, res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  try {
    const customerId = req.params.id;
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    console.log(customer);
    //!if customer is null sepravi da ni tega customerja v databazi
    if (!customer) {
      res.status(404).json({ error: "customer not found" });
    } else {
      //!to get customer in postm}an to see it u have to write res.json below
      res.json({ customer });
    }
  } catch (e) {
    res.status(500).json({ error: "shit just got wrong" });
  }
});
//!add data
app.post("/api/customers", async (req, res) => {
  const customer = new Customer(req.body);
  try {
    //!we have to have await to wait for customer to be saved before we try to send response
    await customer.save();
    res.status(201).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//!MONGODB FUNCTION TO LOAD
const start = async () => {
  try {
    await mongoose.connect(
      //!moras napisati username ter password v env fajlu drugač ne zalaufa server
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

//!update customer PUT
//!USE POST FOR ADDING A RESOURCE KO HOČEMO DODAT NOVI CUSTOMER
//!PUT UPORABIMO PA KO UPDEJTAMO CUSTOMER! KO SE VNAŠA PONAVLJAJOČE STVARI RECIMO :)

app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    //!first object containing customerId and a new customer u want to replace it with
    //!vzamemo original customer ga spremenimo kokr želimo in ga vrnemo nazaj
    const result = await Customer.replaceOne({ _id: customerId }, req.body);
    res.json({ updatedCount: result.modifiedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//!DELETE CUSTOMER bodi prepričan da želiš zbrisat samo 1 item

app.delete("/api/customers/:id", async (req, res) => {
  try {
    const result = await Customer.deleteOne({ _id: req.params.id });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
start();
