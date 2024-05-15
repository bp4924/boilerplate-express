let express = require("express");
const { next } = require("slate");
let app = express();

// get route parameter from client
app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  res.json({ echo: word });
});

// middleware
app.use("/", (req, res, next) => {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);

  next();
});

// chain middleware
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// serve JSON using .env
app.get("/json", (req, res) =>
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" })
);

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
