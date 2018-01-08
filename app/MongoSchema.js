var mongoose = require("mongoose");

var PhotoSchema = new mongoose.Schema({
  title: {
    type: String
  },

  price: {
    type: Number
  },

  instock: {
    type: Boolean
  },

  photo: {
    type: String
  }
});

var PhotoModel = mongoose.model("products", PhotoSchema);
PhotoModel.create({
  title: "Beautiful Image",
  price: 20,
  instock: true,
  photo: "a blue link"
});
module.export = PhotoModel;
