const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", (req, res) => {
  Product.find({}).then((foundProduct) => {
    res.send(foundProduct);
  });
});

router.post("/", (req, res) => {
  if (req.body._id) {
    const { _id, ...info } = req.body;
    Product.findByIdAndUpdate(_id, { info }, (err, editedProduct) => {
      if (err) {
        console.log(err);
      } else {
        editedProduct.save();
      }
    });
    res.sendStatus(200).end();
  }
  const newProduct = {
    info: req.body,
    tags: {
      priceRange: "500-750",
      brand: "apple",
      color: "white",
      os: "ios",
      internalMemory: "256",
      ram: "3",
      displaySize: "5.5",
      displayResolution: "1080x1920",
      camera: "12",
      cpu: "hexa_core",
    },
  };

  Product.create(newProduct, (err, createdProduct) => {
    if (err) {
      console.log(err);
    } else {
      createdProduct.save();
      // res.sendStatus(201);
    }
  });
});

router.put("/", (req, res) => {
  console.log({ LOL: req.body });
  const newProduct = {
    info: req.body.info,
  };

  // Product.findByIdAndUpdate(req.body._id, newProduct, (err, createdProduct) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     createdProduct.save();
  //   }
  // });
});

module.exports = router;
