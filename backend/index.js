const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db");
const productRoutes = require("./routes/product.route");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const commentRoutes = require("./routes/comment.route");

const app = express();
const port = 5000;

connectToDatabase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
    console.log(`[Success] Server is running on http://localhost:${port}`);
});
