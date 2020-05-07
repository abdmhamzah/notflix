const router = require("express").Router();
const routerMovies = require("./routerMovies");
const routerTvSeries = require("./routerTvSeries");

router.use("/movies", routerMovies);
router.use("/tvSeries", routerTvSeries);

module.exports = router;
