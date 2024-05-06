const router = require('express').Router();
const { Trip, Location, Traveller } = require('../../models');

// The `/api/travellers` endpoint

// find all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Location, through: Trip }],
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single traveller by its `id`
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, through: Trip }],
    });
    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new traveller
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create({
        name: req.body.name,
        email: req.body.email
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a traveller's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!travellerData[0]) {
      res.status(404).json({ message: 'No traveller with this id!' });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on traveller by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;