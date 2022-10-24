//jshint esversion:6
require("dotenv").config() // --> It is very important to use this code as early as possible in your codes.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;



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

const User = new mongoose.model("User", userSchema);

///// GET METHODS ____________________________________________

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

////// POST METHODS

app.post("/register", function(req, res) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash // we hashed the password while registering.
    });
    newUser.save(function(err) {
      if (!err) {
        res.render("secrets");
      } else {
        res.send(err);
      }
    });
  });
});

app.post("/login", function(req, res) {
  const userName = req.body.username;
  const passWord = req.body.password; // we hashed the password input here too, and will compare the registered and login hashes.

  User.findOne({email: userName}, function(err, foundOne) {
    if (foundOne) {
      bcrypt.compare(passWord, foundOne.password, function(err, result) {
        if(result === true){
          res.redirect("secrets");
        } else {
          res.redirect("login");
        }
      });
    } else {
      res.send(err);
    }
  });
});

////// SERVER START - LISTEN METHOD

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
