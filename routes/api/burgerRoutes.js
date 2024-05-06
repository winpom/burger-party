const router = require('express').Router();
const { Burger, Restaurant, Review } = require('../../models');

// The `/api/burgers` endpoint

// find all burgers
router.get('/', async (req, res) => {
  try {
    const burgerData = await Burger.findAll({
      include: [{ model: Restaurant, through: Review }],
    });
    res.status(200).json(burgerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single burger by its `id`
router.get('/:id', async (req, res) => {
  try {
    const burgerData = await Burger.findByPk(req.params.id, {
      include: [{ model: Restaurant, through: Review }],
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

// create a new burger
router.post('/', async (req, res) => {
  try {
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