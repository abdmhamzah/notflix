const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongo = require("./config/mongo");
const cors = require("cors");

mongo.connect(function (err) {
  if (!err) {
    const routes = require("./routes"); // WAJIBUN UNTUK MANGO DOI DI DALEM
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", routes);
    app.listen(port, () => console.log("Listening on port", port));
  }
});
