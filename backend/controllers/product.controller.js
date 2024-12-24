const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const { name, brand, basePrice, description, colors } = req.body;

        if (!name || !brand || !basePrice || !description || !colors || colors.length === 0) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const product = new Product({
            name,
            brand,
            basePrice,
            description,
            colors,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: error.message });
    }
};



const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, basePrice, description, colors } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, brand, basePrice, description, colors },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
