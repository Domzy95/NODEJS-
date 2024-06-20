//!SCHEMAS AND MODELS

const mongoose = require("mongoose");

customerSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  industry: String,
});
//!model in actual mongodb to bomo exportali iz tega fajla kar bomo importali v drugem fajlu
module.exports = mongoose.model("customers", customerSchema);
