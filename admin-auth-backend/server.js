import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import foodRoutes from './routes/food.js';
import adminRoutes from './routes/admin.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://fooddelivery-g8cc.onrender.com', // your frontend URL
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve images

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/food', foodRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection failed:', err));
