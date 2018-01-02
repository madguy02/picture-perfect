var express = require("express");
var mongoose = require("mongoose");
var product = require("./product");
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var _ = require("lodash");
var app = express();
var router = express.Router();
var cors = require("cors");
mongoose.connect("mongodb://localhost:27017/products");
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route("/products").post(function(req, res) {
  var p = new product();
  p.title = req.body.title;
  p.price = req.body.price;
  p.instock = req.body.instock;
  p.photo = req.body.photo;
  p.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "product created" });
    }
  });
});

router.route("/products").get(function(req, res) {
  product.find(function(err, products) {
    if (err) {
      res.status(401).send();
    } else {
      res.send(products);
    }
  });
});

router.route("/products/:product_id").get(function(req, res) {
  product.findbyId(req.params.product_id, function(err, prod) {
    res.json(prod);
  });
});

router.route("/products/:product_id").put(function(req, res) {
  product.findbyId(req.params.product_id, function(err, prod) {
    if (err) {
      res.send(err);
    }
    prod.title = req.body.title;
    prod.price = req.body.price;
    prod.instock = req.body.instock;
    prod.photo = req.body.photo;
    prod.save(function(err) {
      if (err) {
        res.status(401).send({ message: "error occured" });
      } else {
        res.json({ message: "product updated" });
      }
    });
  });
});

app.use(cors());
app.use("/api", router);
app.listen(3000);
console.log("server running");
