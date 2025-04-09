const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const router = require("./router/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/nsm") 
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Not Connected");
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(fileUpload());

app.use(express.static("public"));
app.use("/assets", express.static("assets"));

app.use(router);


module.exports = app;