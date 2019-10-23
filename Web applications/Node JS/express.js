// for server hosting
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://barath:1234456789@cluster0-74pmr.mongodb.net/test?retryWrites=true&w=majority",{userNewUrlParser:true}).then(()=>console.log("db connected")).catch(err => console.log(err));

var studentschema = new mongoose.Schema({
  name:String,
  rollno:Number,
  teamname:String
})

var Student = mongoose.model("student", studentschema)

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("home.css"));


var friends = ["a","b","c","e","f","h"];

app.get('/', function (req, res) 
{
  //res.sendfile(__dirname+"/home.html") //to show the html directly
  var route = req.query.name;
  res.render("index.ejs", {name:friends,route:route}); //to show from ejs file

  var barath = new Student({
    name:"Barath",
    rollno:24,
    teamname:"Protosem"
  }).save().then(()=>console.log("saved")).catch(() => console.log("save failed"));
  
  Student.find({},function(err, users){
    if (err){
      console.log("cannot find student");
    }
    else{
      res.render("index.ejs",{name:friends,route:route,student:users});
    }
  
  })
})

app.get('/home:new', function (req, res) 
{
    var old = req.params.new;
    res.send("Welcome to "+old+ " page"); //to show from ejs file
})
 
app.post('/add', function (req, res) 
{
    var neww= req.body.name;
    friends.push(neww);
    console.log(neww);
  res.render("index.ejs", {name:friends});
})
app.listen(3000, function(){
    console.log("location @ 3000");
})
