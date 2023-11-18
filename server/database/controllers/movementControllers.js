const Movement = require("../models/movement");

const controller = {
  getMovements: async (req, res) => {
    try {
      const movements = await Movement.find();
      res.status(200).json(movements);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addMovement: async (req, res) => {
    try {
      const movement = await Movement.create(req.body);
      res.status(201).json(movement);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateMovement: async (req, res) => {
    try {
      const movement = await Movement.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(movement);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteMovement: async (req, res) => {
    try {
      await Movement.findByIdAndDelete(req.params.id);
      res.status(200).json("Movement has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = controller;