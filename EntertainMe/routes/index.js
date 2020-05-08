const router = require("express").Router();
const routerMovies = require("./routerMovies");
const routerTvSeries = require("./routerTvSeries");

router.get("/entertainme", (req, res) => res.send("ENTERTAINME"));
router.use("/movies", routerMovies);
router.use("/tv", routerTvSeries);

module.exports = router;
