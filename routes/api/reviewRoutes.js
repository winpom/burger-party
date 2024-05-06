const router = require('express').Router();
const { Review, Restaurant, Burger, User } = require('../../models');

// Create a new review
router.review('/', async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      content: req.body.content,
      restaurant_id: req.session.restaurant_id,
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
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a review - presently not including
// router.put('/:id', async (req, res) => {
//   try {
//     const review = await Review.findByPk(req.params.id);

//     if (!review) {
//       res.status(404).json({ message: 'Review not found' });
//       return;
//     }

//     review.title = req.body.title;
//     review.content = req.body.content;
//     await review.save(); // Save the changes

//     res.status(200).json({ message: 'Review updated successfully', updatedReview: review });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;