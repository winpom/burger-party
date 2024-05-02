const router = require('express').Router();
const { Trip, Location, Traveller } = require('../../models');

// The `/api/trips` endpoint

// find all trips
router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            include: [{ model: Location }],
        });
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find a single trip by its `id`
router.get('/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [{ model: Location }],
        });
        if (!tripData) {
            res.status(404).json({ message: 'No trip found with that id!' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new trip
router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create({
            trip_budget: req.body.trip_budget,
            traveller_amount: req.body.traveller_amount,
            traveller_id: req.body.traveller_id,
            location_id: req.body.location_id,
        });
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a trip's name by its `id` value
router.put('/:id', async (req, res) => {
    try {
        const tripData = await Trip.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!tripData[0]) {
            res.status(404).json({ message: 'No trip with this id!' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete on trip by its `id` value
router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!tripData) {
            res.status(404).json({ message: 'No trip found with that id!' });
            return;
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
