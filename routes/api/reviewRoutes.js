const express = require('express');
const { Review, Burger, User, Restaurant } = require('../../models');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Create a new review WITHOUT image upload
router.post('/', async (req, res) => {
  try {
    // Create a new review with the provided title, content, and associated restaurant ID
    const newReview = await Review.create({
      title: req.body.title,
      rating: req.body.rating,
      review_content: req.body.review_content,
      restaurant_id: req.body.restaurant_id,
      burger_id: req.body.burger_id,
      user_id: req.body.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // Create a new review with image upload
// router.post('/', upload.single('photo'), async (req, res) => {
//   try {
//     // Create a new review with the provided title, content, and associated restaurant ID
//     const newReview = await Review.create({
// title: req.body.title,
// rating: req.body.rating,
// review_content: req.body.review_content,
// restaurant_id: req.body.restaurant_id,
// burger_id: req.body.burger_id, 
// user_id: req.body.user_id,
//       // Add the filename of the uploaded image to the database
//       image: req.file.filename // Assuming the column name in the database is 'image' - we will need to confirm
//     });

//     res.status(200).json(newReview);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Route to find all reviews
router.get('/', async (req, res) => {
  try {
    // Fetch all reviews from the database, including associated models like Restaurant, Burger, and User
    const reviewData = await Review.findAll({
      include: [{ model: Restaurant }, { model: Burger }, { model: User }]
    });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single review by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Fetch the review data by its ID, including associated restaurants and reviews
    const reviewData = await Review.findByPk(req.params.id, {
      include: [{ model: Restaurant }, { model: Burger }, { model: User }]
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with that id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    // Find the review by its ID
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    // Delete the review
    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
