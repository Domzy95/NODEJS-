const express = require("express");
const app = express();
const port = 3000;
//!retrieve data
app.get("/", (req, res) => {
  res.send("Hello express World!");
});
//!add data
app.post("/", (req, res) => {
  res.send("Hello Post World!");
});
app.listen(port, () => {
  console.log(`Example EXPRESS! app listening on port ${port}`);
});
