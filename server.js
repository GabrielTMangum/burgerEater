var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public" ,express.static("./public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "burgers_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers", (err, data) => {
        if (err) throw err;

        res.render("index", { burgers: data })
    })
});

app.put("/api/burgers/:id", function(req, res) {
    const id = req.params.id;
    const updatedBurger = req.body;
  
    connection.query(
      "UPDATE burgers SET devoured = ? WHERE ?", [updatedBurger, {id: id}], (err, data) => {
      if (err) throw err;
  
      res.end();
    })
  });

app.post("/api/burgers", function (req, res) {
    const newBurger = req.body;

    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [newBurger.burger_name], (err, data) => {
        if (err) throw err;
        res.end();
    })
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });