const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/get", getProducts);
router.get("/get/:id", getProductById);
router.post("/post", authenticate, authorize("Poster"), createProduct);
router.put("/put/:id", authenticate, authorize("Poster"), updateProduct);
router.delete("/delete/:id", authenticate, authorize("Poster"), deleteProduct);

module.exports = router;
