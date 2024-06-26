const express = require('express');
const { User, Review, Burger, Restaurant } = require('../models');
const router = express.Router();

// Route to display the user dashboard with their reviews
router.get('/', async (req, res) => {
  try {
    if (!req.session.user_id) {
      // Handle case where user is not logged in
      res.render('dashboard', { message: 'Please log in to view the dashboard' });
      return;
    }
    
    // Fetch the user data based on the user ID stored in the session
    const userData = await User.findByPk(req.session.user_id);

    // Fetch all reviews created by the user, including associated burger and restaurant
    const userReviews = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        { model: Burger, include: [{ model: Restaurant }] }, { model: Restaurant }// Include the burger being reviewed and its associated restaurant
      ],
      order: [['createdAt', 'DESC']]
    });

    // Convert user data and review data to plain JavaScript objects
    const user = userData.get({ plain: true });
    const reviews = userReviews.map((review) => review.get({ plain: true }));

    // Render the dashboard template with user data and reviews
    res.render('dashboard', {
      user,
      reviews,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the new review creation page
router.get('/write-review', async (req, res) => {
  try {
    // Get the logged-in user's username from the session
    const loggedInUsername = req.session.username; 

    // Render the new review page with the logged-in username
    res.render('write-review', { loggedIn: req.session.loggedIn, username: loggedInUsername });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error('Error rendering new review page:', err);
    res.status(500).json({ error: 'Failed to render new review page' });
  }
});

module.exports = router;
