const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const mongoose = require('mongoose');
const axios = require('axios');



router.get("/", async (re1, res) => {
    res.json("message: order service is running");
})


router.post("/", async (req, res) => {

    const { userName, productName } = req.body;

    console.log("Received order request: ", req.body);


    if (!userName || !productName) {
        return res.status(400).json({ message: "User's Name and product Name are required" });
    }

    // Check if userId and productId are valid ObjectIds
    try {
         console.log(`Fetching user: ${userName}, product: ${productName}`);

        const userRes = await axios.get(`http://user-service:4001/api/users/name/${userName}`);
        const productRes = await axios.get(`http://product-service:4002/api/products/name/${productName}`);

        // const userRes = await axios.get(`http://localhost:4001/api/users/name/${userName}`);
        // const productRes = await axios.get(`http://localhost:4002/api/products/name/${productName}`);

        const user = userRes.data;
        const product = productRes.data;

        if (!user || !product) {
            return res.status(404).json({ message: "User or Product not found" });
        }

        console.log("User Fetched: ", user);
        console.log("Product Fetched: ", product);

        const newOrder = new Order({
            userId: user._id,
            productId: product._id,
            userName: user.name,
            productName: product.name,
            quantity: 1
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed", order: newOrder });
    } catch (err) {
        console.error("[order-service]Error placing order", err);
        res.status(500).json({ message: "Error placing order" });
    }
})

// Optional: View all orders
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ orders });
    } catch (err) {
        console.error("Error fetching orders:", err.message);
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
});

module.exports = router;


