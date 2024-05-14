let express = require("express");
let app = express();

//console.log("Hello World")

//app.get("/", (req, res) =>
//  res.send("Hello Express"));

// middleware
app.use("/", (req, res, next) => {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);

  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/json", (req, res) =>
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" })
);

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
