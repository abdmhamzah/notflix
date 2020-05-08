const router = require("express").Router();
const ControllerMovies = require("../controllers/ControllerMovies");

router.get("/", ControllerMovies.getMovies);
router.post("/", ControllerMovies.createMovie);
router.get("/:id", ControllerMovies.getMovie);
router.put("/:id", ControllerMovies.updateMovie);
router.delete("/:id", ControllerMovies.deleteMovie);

module.exports = router;
