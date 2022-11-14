const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');

router.get(`/`, async (req, res) => {
  const categoryList = await User.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.send(categoryList);
});

module.exports = router;
