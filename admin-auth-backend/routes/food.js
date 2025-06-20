import express from 'express';
import multer from 'multer';
import Food from '../models/Food.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// JWT verification middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token invalid or expired" });
  }
};

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST /api/food/add
router.post('/add', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    const newFood = new Food({ name, description, price, category, image: imagePath });
    await newFood.save();

    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add food item" });
  }
});

export default router;
