const express=require('express');
const app = express();
const cors = require('cors');
const axios= require('axios');
const Order =require('./models/Order');
const mongoose = require('mongoose');
const orderRoutes = require("./routes/orders");

const PORT =4003;

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/orders")
.then(()=>{
    console.log("Connnected to mongodb");
}).catch((err)=>{
    console.error("Error connecting to mongodb",err);
})

// Middleware
app.use(express.json());
app.use(cors());


//apis

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});