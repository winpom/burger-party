const router = require('express').Router();
const { Restaurant, Burger, Review } = require('../../models');


// The `/api/restaurants` endpoint

// find all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      include: [{ model: Restaurant, through: Burger }],
    });
    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single restaurant by its `id`
router.get('/:id', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id, {
      include: [{ model: Burger }],
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

// create a new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.create({
    restaurant_name: req.body.restaurant_name,
    });
    res.status(200).json(restaurantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a restaurant's name by its `id` value (not updating restaurants...right?)
// router.put('/:id', async (req, res) => {
//   try {
//     const restaurantData = await Restaurant.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!restaurantData[0]) {
//       res.status(404).json({ message: 'No restaurant with this id!' });
//       return;
//     }
//     res.status(200).json(restaurantData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// delete on restaurant by its `id` value (not deleting restaurants)
// router.delete('/:id', async (req, res) => {
//   try {
//     const restaurantData = await Restaurant.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!restaurantData) {
//       res.status(404).json({ message: 'No restaurant found with that id!' });
//       return;
//     }

//     res.status(200).json(restaurantData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
