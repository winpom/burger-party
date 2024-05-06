const express = require('express');
const { Review } = require('../../models'); 
const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    // Create a new review with the provided title, content, and associated restaurant ID
    const newReview = await Review.create({
      title: req.body.title,
      review_star: req.body.review_star,
      review_content: req.body.review_content,
      restaurant_id: req.body.restaurant_id,
      burger_id: req.body.burger_id, 
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newReview);
  } catch (err) {
    console.log(err);
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
