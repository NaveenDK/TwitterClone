const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const Twitter = require("./api/helpers/twitter");
const twitter = new Twitter();
const port = 3000;
require("dotenv").config();
var cors = require("cors");

app.use(cors());

app.get("/tweets", (req, res) => {
  const query = req.query.q;
  const count = req.query.count;
  const maxId = req.query.max_id;

  twitter
    .get(query, count, maxId)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//------------deployment-----------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}
//-------------deployment--------------
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
