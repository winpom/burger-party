const express = require('express');
const { Restaurant, Burger, Review } = require('../../models');
const router = express.Router();

// Route to find all restaurants
router.get('/', async (req, res) => {
  try {
    // Fetch all restaurants from the database, including associated burgers and reviews
    const restaurantData = await Restaurant.findAll({
      // include: [{ model: Burger, include: [{ model: Review }] }],
    });
    
    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single restaurant by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Fetch the restaurant data by its ID, including associated burgers and reviews
    const restaurantData = await Restaurant.findByPk(req.params.id, {
      // include: [{ model: Burger, include: [{ model: Review }] }],
    });

    if (!restaurantData) {
      res.status(404).json({ message: 'No restaurant found with that id!' });
      return;
    }

    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new restaurant
router.post('/', async (req, res) => {
  try {
    // Create a new restaurant with the provided restaurant_name
    const restaurantData = await Restaurant.create({
      restaurant_name: req.body.restaurant_name,
      location_name: req.body.location_name
    });

    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;