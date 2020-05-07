const router = require("express").Router();
const ControllerTvSeries = require("../controllers/ControllerTvSeries");

router.get("/tvSeries", ControllerTvSeries.getTvSeries);
router.post("/tvSeries", ControllerTvSeries.createTvSerie);
router.get("/tvSeries/:id", ControllerTvSeries.getTvSerie);
router.put("tvSeries/:id", ControllerTvSeries.updateTvSerie);
router.delete("tvSeries/:id", ControllerTvSeries.deleteTvSerie);

module.exports = router;
