const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burgers_db"
    });
}

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static("./public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers", (err, data) => {
        if (err) throw err;

        res.render("index", { burgers: data })
    })
});

app.put("/api/burgers/", function (req, res) {
    const id = req.body.id

    console.log(id)
    connection.query(
        "UPDATE burgers SET devoured = ? WHERE ?", [1, { id: id }], (err, data) => {
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

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});