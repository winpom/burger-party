const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => { 
  try {
    const userData = await User.findByPk(req.session.user_id);
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{model: Comment, include: [{model: User}]}, {model: User}]
    });

    const user = userData.get({
      plain: true,
    })

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('HERE')
    console.log(userData);

    res.render('dashboard', {
      user,
      posts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Renders the new post page
router.get('/new', async (req, res) => {
  try {
    const loggedInUsername = req.session.username; 

    res.render('new-post', { loggedIn: true, username: loggedInUsername });
  } catch (err) {
    console.error('Error rendering new post page:', err);
    res.status(500).json({ error: 'Failed to render new post page' });
  }
});

module.exports = router;
