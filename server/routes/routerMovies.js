const router = require("express").Router();
const ControllerMovies = require("../controllers/ControllerMovies");

router.get("/", ControllerMovies.getMovies);
router.post("/", ControllerMovies.createMovies);
router.get("/:id", ControllerMovies.getMovie);
router.put("/:id", ControllerMovies.updateMovies);
router.delete("/:id", ControllerMovies.deleteMovies);

module.exports = router;
