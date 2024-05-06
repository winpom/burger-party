const express = require('express');
const { Burger, Restaurant, Review } = require('../../models');
const router = express.Router();

// Route to find all burgers
router.get('/', async (req, res) => {
  try {
    // Fetch all burgers from the database, including associated restaurants and reviews
    const burgerData = await Burger.findAll({
      include: [{ model: Restaurant }, { model: Review }],
    });
    
    res.status(200).json(burgerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single burger by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Fetch the burger data by its ID, including associated restaurants and reviews
    const burgerData = await Burger.findByPk(req.params.id, {
      include: [{ model: Restaurant }, { model: Review }],
    });

    if (!burgerData) {
      res.status(404).json({ message: 'No burger found with that id!' });
      return;
    }

    res.status(200).json(burgerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new burger
router.post('/', async (req, res) => {
  try {
    // Create a new burger with the provided name and cost
    const burgerData = await Burger.create({
        name: req.body.name,
        cost: req.body.total_cost
    });
    res.status(200).json(burgerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a burger's name by its `id` value (not updating)
// router.put('/:id', async (req, res) => {
//   try {
//     const burgerData = await Burger.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!burgerData[0]) {
//       res.status(404).json({ message: 'No burger with this id!' });
//       return;
//     }
//     res.status(200).json(burgerData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// delete on burger by its `id` value (not deleting)
// router.delete('/:id', async (req, res) => {
//   try {
//     const burgerData = await Burger.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!burgerData) {
//       res.status(404).json({ message: 'No burger found with that id!' });
//       return;
//     }

//     res.status(200).json(burgerData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;