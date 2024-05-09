const router = require('express').Router();
const dashboardRoutes = require('./dashboard-page');
const homeRoutes = require('./home-page');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;