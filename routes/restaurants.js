const Restaurant = require('../models/index.js')
const express = require('express');
const router = express.Router();
router.use(express.json());
const { check, validationResult } = require("express-validator");


router.post('/',
  [
    check("name", "InvalidName")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .custom((value) => {
        if (value.trim().length === 0) {
          throw new Error("Name cannot be just whitespace");
        }
        return true; // Value is valid
      }), // Check if the name is not just whitespace
      
    check("location", "InvalidLocation").notEmpty(),
    check("cuisine", "InvalidCuisine").notEmpty(),
  ],
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return errors if validation fails
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const { name, location, cuisine } = req.body;
      const newRestaurant = await Restaurant.create({ name, location, cuisine });
      res.status(201).json(newRestaurant);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create restaurant', details: error.message });
    }
  }
);

  router.get('/', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch restaurants', details: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id);
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch restaurant', details: error.message });
    }
  });


  router.put('/:id', async (req, res) => {
    try {
      const { name, location, cuisine } = req.body;
      const [updated] = await Restaurant.update(
        { name, location, cuisine },
        { where: { id: req.params.id } }
      );
      if (!updated) return res.status(404).json({ error: 'Restaurant not found' });
      const updatedRestaurant = await Restaurant.findByPk(req.params.id);
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      res.status(400).json({ error: 'Unable to update restaurant', details: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Restaurant.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Restaurant not found' });
      res.status(204).send(); // Successful deletion, no content
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete restaurant', details: error.message });
    }
  });

  module.exports = router;
