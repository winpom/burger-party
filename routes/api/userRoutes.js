const router = require('express').Router();
const { User, Review } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      bio: req.body.bio,
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

// Route to find all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database,
    const userData = await User.findAll({
      // include: [{ model: Restaurant }, { model: Review }],
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single user by its id for display on the User page
router.get('/:id', async (req, res) => {
  try {
    // Fetch the user data by its ID, including associated reviews
    const userId = req.params.id;
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Review },],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    const user = userData.get({ plain: true });
    const reviews = user.Reviews;

    res.render('user-details', {
      user,
      reviews,
    });

    // res.status(200).json(userData); // Commented out because of rendering
  } catch (err) {
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
