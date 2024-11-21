const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query, excludeId } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const users = await User.find({
      $or: [{ username: { $regex: query, $options: 'i' } }],
      _id: { $ne: excludeId },
    }).select('-password');

    if (users.length === 0) {
      return res.status(200).json({ message: 'No users found' });
    }

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
