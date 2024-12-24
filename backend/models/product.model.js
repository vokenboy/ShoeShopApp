const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ["39", "40", "41", "42", "43", "44", "45", "46", "47"],
    },
    count: {
        type: Number,
        required: true,
        min: 0,
    },
});

const colorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    variations: [variationSchema],
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        colors: [colorSchema],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
