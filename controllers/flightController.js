const Flights = require("../models/FlightModel");

const flightController = {
  getFlights: async (req, res) => {
    try {
      const flights = await Flights.find({ user_id: req.user.id });
      res.json(flights);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addFlight: async (req, res) => {
    try {
      const { airline, desc, from, to, date } = req.body;
      const newFlight = new Flights({
        airline,
        desc,
        from,
        to,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newFlight.save();
      res.json(newFlight);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteFlight: async (req, res) => {
    try {
      await Flights.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a flight" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateFlight: async (req, res) => {
    try {
      const { airline, desc, from, to, date } = req.body;
      await Flights.findOneAndUpdate(
        { _id: req.params.id },
        { airline, desc, from, to, date }
      );
      res.json({ msg: "Updated a flight" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getFlightById: async (req, res) => {
    try {
      const flight = Flights.findById(req.params.id);
      res.json(flight);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = flightController;
