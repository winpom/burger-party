const express = require('express');
const { User, Review, Restaurant, Burger } = require('../models');
const router = express.Router();

// Route to fetch all reviews with associated user, burger, and restaurant
router.get('/', async (req, res) => {
  try {
    // Check if the user is logged in
    const loggedIn = req.session.loggedIn;

    // Fetch all reviews from the database, including associated user and burger with their restaurant
    const reviewData = await Review.findAll({
      include: [
        { model: User }, // Include the user who wrote the review
        { model: Burger, include: [{ model: Restaurant }] } // Include the burger being reviewed and its associated restaurant
      ]
    });

    // Map the fetched data to plain JavaScript objects
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Render the homepage template with the fetched reviews and login status
    res.render('homepage', { loggedIn, reviews });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // If not logged in, render the login page with loggedIn set to false
  res.render('login', { loggedIn: false });
});

// Route to fetch a single review by ID with associated user, burger, and restaurant
router.get('/review/:id', async (req, res) => {
  try {
    // Extract the review ID from the request parameters
    const reviewId = req.params.id;

    // Find the review by its ID, including associated user, burger, and restaurant
    const reviewData = await Review.findByPk(reviewId, {
      include: [
        { model: User }, // Include the user who wrote the review
        { model: Burger, include: [{ model: Restaurant }] } // Include the burger being reviewed and its associated restaurant
      ]
    });

    // If the review is not found, return a 404 error
    if (!reviewData) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    // Convert the fetched review data to a plain JavaScript object
    const review = reviewData.get({ plain: true });

    // Render the review page with the fetched review data and login status
    res.render('review', { review, loggedIn: req.session.loggedIn });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve review data' });
  }
});

// Export the router for use in other files
module.exports = router;
