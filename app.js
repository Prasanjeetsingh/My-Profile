const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Prasanjeet:Prashan@cluster1-afwkb.mongodb.net/webDb",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const ansSchema =new  mongoose.Schema({
  firstName : String,
  lastName: String,
  like: String,
  dislike: String,
  moment: String
});
const Answer = mongoose.model("Answer" , ansSchema);
var answer={};
app.get("/",function(req ,res){
res.sendFile(__dirname + "/index.html");
});
app.get("/contact-me",function(req , res){
  res.sendFile(__dirname +"/contactMe.html");
});
app.post("/contact-me", function(req , res ){
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const lik =req.body.like;
  const dislik =req.body.dislike;
  const momen =req.body.moment;

  answer =new Answer ({
    firstName: fName,
    lastName: lName,
    like: lik,
    dislike: dislik,
    moment: momen
  });
  answer.save();
res.redirect("/submit");
});
app.get("/submit" , function(req , res){
    res.render("list" , {ans: answer });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Server has started Succesfully");
});
