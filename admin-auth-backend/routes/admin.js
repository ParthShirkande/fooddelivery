// routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.json({ success: false, message: 'Admin not found' });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
  return res.json({ success: true, token });
});

module.exports = router;
