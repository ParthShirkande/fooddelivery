const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const email = 'p96@gmail.com';
  const password = '12345678';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = new Admin({ email, passwordHash });
  await admin.save();

  console.log('Admin created');
  mongoose.disconnect();
}).catch(console.error);
