var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema({
  title: String,
  price: Number,
  instock: Boolean,
  photo: String
});

module.exports = mongoose.model("product", productSchema);
