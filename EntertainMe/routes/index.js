const router = require("express").Router();
const routerMovies = require("./routerMovies");
const routerTvSeries = require("./routerTvSeries");
const ControllerEntertainMe = require("../controllers/ControllerEntertainMe");

router.get("/entertainme", ControllerEntertainMe.findAll);
router.use("/movies", routerMovies);
router.use("/tv", routerTvSeries);

module.exports = router;
