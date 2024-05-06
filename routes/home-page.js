const express = require('express');
const { User, Review, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Check if the user is logged in
    const loggedIn = req.session.loggedIn;

    // Fetch posts data from the database
    const postData = await Post.findAll({
      include: [{ model: Comment, include: [{model: User}] }, {model: User}]
    });

    // Map the data to plain objects
    const mappedData = postData.map((post) =>
      post.get({
        plain: true
      })
    );

    // Render the homepage template, passing loggedIn and posts data
    res.render('homepage', { loggedIn, posts: mappedData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // If not logged in, render the login page with loggedIn set to false
  res.render('login', {
    loggedIn: false
  });
});

// Get a post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['username'] }, {model: Comment, include: [{model: User, attributes: ['username']}]}], 
    });

    if (!postData) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    const post = postData.get({plain: true})
    console.log(post);

    res.render('post', {post, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve post data' });
  }
});

module.exports = router;
