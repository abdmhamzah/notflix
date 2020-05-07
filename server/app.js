const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongo = require("./config/mongo");

mongo.connect(function (err) {
  if (!err) {
    const router = require("./routes"); // WAJIBUN UNTUK MANGO DOI DI DALEM
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", router);
    app.listen(port, () => console.log("Listening on port", port));
  }
});
