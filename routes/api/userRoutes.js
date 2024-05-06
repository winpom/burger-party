const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = newUser.id;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData || !(await userData.checkPassword(req.body.password))) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Initialize session data directly after successful login
    req.session.loggedIn = true;
    req.session.user_id = userData.id;
    res.status(200).json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;