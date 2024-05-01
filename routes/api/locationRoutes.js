const router = require('express').Router();
const { Trip, Location, Traveller } = require('../../models');

// The `/api/locations` endpoint

// find all locations
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [{ model: Location, through: Trip }],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single location by its `id`
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Trip }],
    });
    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new location
router.post('/', async (req, res) => {
  try {
    const locationData = await Location.create({
    location_name: req.body.location_name,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a location's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const locationData = await Location.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!locationData[0]) {
      res.status(404).json({ message: 'No location with this id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on location by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
