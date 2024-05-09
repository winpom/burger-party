const express = require('express');
const { User, Review, Restaurant, Burger } = require('../models');
const router = express.Router();
const {averageRating, averageCost} = require('../utils/calcAverage')

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

// Route to fetch all reviews
router.get('/', async (req, res) => {
  try {

    const reviewData = await Review.findAll({
      include: [
        { model: User }, // Include the user who wrote the review
        { model: Restaurant, include: [{ model: Burger }] } // Include the restaurant being reviewed and its associated burger
      ]
    });
    const restaurantData = await Restaurant.findAll({
      include: [
        { model: Burger }, {model: Review} 
      ]
    });

    // Map the fetched data to plain JavaScript objects
    const restaurants = restaurantData.map((review) => review.get({ plain: true }));
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    for (let i=0; i < restaurants.length; i++) {
      const rating = averageRating(restaurants[i].reviews)
      const cost = averageCost(restaurants[i].burgers)
      restaurants[i].rating=rating.toFixed(2);
      restaurants[i].avgCost=cost.toFixed(2);
    }

    // Render the homepage template with the fetched reviews and login status
    res.render('home', {reviews, restaurants, loggedIn: req.session.loggedIn});
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to fetch a single review by ID with associated review, review, and restaurant
router.get('/review/:id', async (req, res) => {
  try {
    // Extract the review ID from the request parameters
    const reviewId = req.params.id;

    // Find the review by its ID, including associated review, review, and restaurant
    const reviewData = await Review.findByPk(reviewId, {
      include: [
        { model: Review }, // Include the review who wrote the review
        { model: Review, include: [{ model: Restaurant }] } // Include the review being reviewed and its associated restaurant
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
    // res.render('review', { review, loggedIn: req.session.loggedIn });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve review data' });
  }
});

// Route to fetch all restaurants with associated burgers and reviews
router.get('/restaurants', async (req, res) => {
  try {
    // Fetch all restaurants from the database, including associated burgers and reviews
    const restaurantData = await Restaurant.findAll({
      include: [
        { model: Burger },
        { model: Review, include: [{ model: User }] } // Include the associated User model for each Review
      ]
    });
    
    // Map the fetched data to plain JavaScript objects
    const restaurants = restaurantData.map((restaurant) => restaurant.get({ plain: true }));

    // Calculate the average rating and cost for each restaurant
    restaurants.forEach((restaurant) => {
      const rating = averageRating(restaurant.reviews);
      const cost = averageCost(restaurant.burgers);
      restaurant.rating = rating.toFixed(2);
      restaurant.avgCost = cost.toFixed(2);
    });

    // Render the restaurants page template with the fetched restaurant data
    res.render('restaurants', { restaurants });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to fetch all reviews and burgers specific to a restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Fetch the restaurant by its ID, including associated burgers and reviews
    const restaurantData = await Restaurant.findByPk(restaurantId, {
      include: [
        { model: Burger },
        { model: Review, include: [{ model: User }] } // Include the associated User model for each Review
      ]
    });
    
    if (!restaurantData) {
      // If the restaurant doesn't exist, return a 404 error
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    // Map the fetched data to a plain JavaScript object
    const restaurant = restaurantData.get({ plain: true });

    // Calculate the average rating and cost for the restaurant
    const rating = averageRating(restaurant.reviews);
    const cost = averageCost(restaurant.burgers);
    restaurant.rating = rating.toFixed(2);
    restaurant.avgCost = cost.toFixed(2);

    // Render the restaurant page template with the fetched restaurant data
    res.render('restaurant', { restaurant });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to fetch all reviews specific to a user
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the restaurant by its ID, including associated burgers and reviews
    const userData = await User.findByPk(userId);

    // Fetch all reviews created by the user, including associated burger and restaurant
    const userReviews = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        { model: Burger, include: [{ model: Restaurant }] } // Include the burger being reviewed and its associated restaurant
      ]
    });

    // Convert user data and review data to plain JavaScript objects
    const user = userData.get({ plain: true });
    const reviews = userReviews.map((review) => review.get({ plain: true }));

    // Render the dashboard template with user data and reviews
    res.render('user', {
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

// Route to write-review page
router.get('/write-review', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      // Handle case where user is not logged in
      res.render('write-review', { message: 'Please log in to write a review' });
      return;
    } else {
      res.render('write-review', {loggedIn: true});
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).json(err);
  }
});


// Export the router for use in other files
module.exports = router;