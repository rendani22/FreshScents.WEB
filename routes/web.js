const express = require('express');
const router = express.Router();
const homeController = require('../controller/productController');

let routes = app => {
    router.get("/", homeController.product);
  
    router.post("/upload", uploadController.uploadFile);
  
    return app.use("/", router);
  };