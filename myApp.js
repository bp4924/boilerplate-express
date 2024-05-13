let express = require("express");
let app = express();

console.log("Hello World");

app.get("/", (req, res) => res.get("Hello Express"));

module.exports = app;
