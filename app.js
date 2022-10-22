//jshint esversion:6
require("dotenv").config() // --> It is very important to use this code as early as possible in your codes.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = process.env.SECRET; // This helps to use secret key that is in the ".env" file.
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});


app.get("/login", function(req, res) {
  res.render("login");
});


app.get("/register", function(req, res) {
  res.render("register");
});


app.get("/secrets", function(req, res) {
  res.render("secrets");
});


app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (!err) {
      res.render("secrets");
    } else {
      res.send(err);
    }
  });
});


app.post("/login", function(req, res) {
  const userName = req.body.username;
  const passWord = req.body.password;

  User.findOne({email: userName}, function(err, foundOne) {
    if (foundOne) {
      if (foundOne.password === passWord) {
        res.redirect("secrets");
      }  else {
        res.redirect("login");
      }
    } else {
      res.send(err);
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
