const validateRegister = (req, res, next) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (user_name.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 8 characters' });
  }

  next();
}

module.exports = { validateRegister };
