const router = require("express").Router();
const ControllerTvSeries = require("../controllers/ControllerTvSeries");

router.get("/tv", ControllerTvSeries.getTvSeries);
router.post("/tv", ControllerTvSeries.createTvSerie);
router.get("/tv/:id", ControllerTvSeries.getTvSerie);
router.put("/tv/:id", ControllerTvSeries.updateTvSerie);
router.delete("/tv/:id", ControllerTvSeries.deleteTvSerie);

module.exports = router;
