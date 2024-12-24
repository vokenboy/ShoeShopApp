const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const password = process.env.MONGO_DB_PASSWORD;
        const uri = `mongodb+srv://admin:${password}@shoeshopdb.58kkn.mongodb.net/?retryWrites=true&w=majority&appName=ShoeShopDb`;

        await mongoose.connect(uri);
        console.log("[Success] Connected to MongoDB");
    } catch (error) {
        console.error("[Error] Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};
module.exports = connectToDatabase;
