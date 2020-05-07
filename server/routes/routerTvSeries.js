const router = require("express").Router();
const ControllerTvSeries = require("../controllers/ControllerTvSeries");

router.get("/", ControllerTvSeries.getTvSeries);
router.post("/", ControllerTvSeries.createTvSerie);
router.get("/:id", ControllerTvSeries.getTvSerie);
router.put("/:id", ControllerTvSeries.updateTvSerie);
router.delete("/:id", ControllerTvSeries.deleteTvSerie);

module.exports = router;
