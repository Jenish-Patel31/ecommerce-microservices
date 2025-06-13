const express=require('express');
const app = express();
const PORT =4002;
const cors = require('cors');
const productRoutes = require("./routes/products.js");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// const MONGO_URI = "mongodb://mongo-product:27017/productdb";
const MONGO_URI = "mongodb://mongo:27017/productdb";

mongoose.connect(MONGO_URI)
.then(() => console.log("Product service connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);

app.listen(4002, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
