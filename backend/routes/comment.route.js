const express = require("express");
const { createComment, getCommentsByProduct } = require("../controllers/comment.controller");
const router = express.Router();

router.post("/post", createComment);
router.get("/get/:productId", getCommentsByProduct);

module.exports = router;
