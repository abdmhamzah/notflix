const router = require("express").Router();
const ControllerMovies = require("../controllers/ControllerMovies");

router.get("/movies", ControllerMovies.getMovies);
router.post("/movies", ControllerMovies.createMovies);
router.get("/movies/:id", ControllerMovies.getMovie);
router.put("/movies/:id", ControllerMovies.updateMovies);
router.delete("/movies/:id", ControllerMovies.deleteMovies);

module.exports = router;
