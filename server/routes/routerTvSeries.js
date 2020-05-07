const router = require("express").Router();
const ControllerTvSeries = require("../controllers/ControllerTvSeries");

router.get("/", ControllerTvSeries.getTvSeries);
router.post("/", ControllerTvSeries.createTvSerie);
router.get("/:id", ControllerTvSeries.getTvSerie);
router.put("/", ControllerTvSeries.updateTvSerie);
router.delete("/", ControllerTvSeries.deldeteTvSerie);

module.exports = router;
