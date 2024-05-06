const router = require('express').Router();
const burgerRoutes = require('./burgerRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');

router.use('/burger', burgerRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);

module.exports = router;
