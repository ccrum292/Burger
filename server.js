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

var connection;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "burgers_db"
  });
};


connection.connect(function(err){
  if(err){
    console.log("error connecting: "+ err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res){

  connection.query("SELECT * FROM burgers", function(err, results){
    if (err) {
      return res.status(500).end();
    }

    const burgersM = results.filter(val=>{
      return !val.devoured;
    });

    const burgersE = results.filter(val=>{
      return val.devoured;
    })

    res.render("index", { burgersMade: burgersM, burgersEaten: burgersE })

  });

});

app.post("/api/burgers", function(req, res){

  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger_name], function(err, results){
    if(err){
      res.status(500).end();
    };

    res.json({ id: results.insertId });
    console.log({ id: results.insertId });

  });

});


// ?????
app.put("/api/burgers/:id", function(req, res){
  console.log(req.params.id);
  connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id], function(err, results) {
    console.log(results)
    if (err){
      return res.status(500).end();
    }else if(results.changedRows === 0){
      return res.status(404).end();
    }
    res.status(200).end();
  });

});




// selectAll();
// insertOne();
// updateOne();

app.listen(PORT, function(){
  console.log("Server listening on: http://localhost:"+ PORT);
});
