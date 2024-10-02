const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/formData", (req, res) => {
  res.send(
    `Data from form :${req.body.name} ${req.body.lname}${req.body.message}.`
  );
});

const port = 8888;

app.listen(port, () => {
  console.log(`Your server is running on port${port}`);
});
