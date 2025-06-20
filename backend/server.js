import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import dotenv from 'dotenv';
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


 
dotenv.config();
// app config
// create express application
const app = express()
const port = 4000

// middleware
app.use(express.json())

//can access backend from any frontend
app.use(cors({
  origin: ['https://fooddelivery-g8cc.onrender.com/', 'https://fooddelivery-fd.onrender.com'],
  credentials: true
}));


//db connections
connectDB();

//api endpoint
app.use("/api/food",foodRouter)

app.use("/api/user", userRouter) 

app.use("/api/cart", cartRouter); 

app.use("/api/order", orderRouter); 


// default route
app.get("/",(req,res)=>{
    res.send("API WORKING")
})

import path from "path";

// Serve static files from frontend
app.use(express.static(path.join(process.cwd(), "frontend", "dist")));

// SPA fallback: serve index.html for any unknown route
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "dist", "index.html"));
});


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}` )
})
