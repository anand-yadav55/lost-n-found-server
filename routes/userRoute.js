const router = require('express').Router();

const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
  try {
    let { email, password, name, contact } = req.body;
    // validate

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.json({ msg: 'An account with this email already exists.' });

    if (!name || !contact || !password || !email) {
      return res.json({ msg: 'Enter all data' });
    }

    const newUser = new User({
      email: email,
      password: password,
      name: name,
      contact: contact,
    });

    const savedUser = await newUser.save();
    res.json(savedUser._id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.json({ msg: 'Not all fields have been entered.' });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.json({
        msg: 'No account with this email has been registered.',
      });

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.json({ msg: 'Invalid credentials.' });
    }

    res.sendStatus(200);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
