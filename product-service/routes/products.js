const Product = require("../models/Products");
const express = require("express");
const router = express.Router();


router.post('/', async (req, res) => {
    const { name, price, stock } = req.body;

    try {
        const product = new Product({
            name, price, stock
        });
        await product.save();

        res.status(201).json({
            message: "Product created Successfully",
            product: product
        })
    } catch (err) {
        console.error("[Product Error: ]Error creating product:", err);
        res.status(500).json({
            message: "Error creating product",
            error: err.message
        })
    }
})


router.get('/name/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const product = await Product.findOne({ name });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product by name:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
