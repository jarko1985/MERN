const router = require("express").Router();
const { auth } = require("../middleware/auth");
const flightController = require("../controllers/flightController");

router
  .route("/")
  .get(auth, flightController.getFlights)
  .post(auth, flightController.addFlight);

router
  .route("/:id")
  .get(auth, flightController.getFlightById)
  .put(auth, flightController.updateFlight)
  .delete(auth, flightController.deleteFlight);

module.exports = router;
