const mysql = require("mysql");
const express = require("express");
const exphbs = require("express-handlebars");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 8080;


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "burgers_db"
});

connection.connect(function(err){
  if(err){
    console.log("error connecting: "+ err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


app.listen(PORT, function(){
  console.log("Server listening on: http://localhost:"+ PORT);
});
