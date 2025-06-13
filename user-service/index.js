const express = require('express');
const mongoose= require("mongoose");
const cors = require('cors');
const app  =express();
const userRoutes = require("./routes/users");
const PORT = 4001;

app.use(cors());
app.use(express.json());


// const MONGO_URI = "mongodb://mongo-user:27017/userdb";
const MONGO_URI = "mongodb://mongo:27017/userdb";

mongoose.connect(MONGO_URI).then(()=>{
    console.log("[user-service] Connected to MongoDB");
}).catch(err => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);

app.listen(PORT,()=>{
    console.log("User service is running on port",PORT);
})