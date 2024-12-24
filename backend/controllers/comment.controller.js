const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
    const { productId, userId, content, rating } = req.body;

    if (!userId || !productId || !content || rating === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newComment = new Comment({ productId, userId, content, rating });
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Failed to add comment" });
    }
};


const getCommentsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await Comment.find({ productId }).populate("userId", "name");
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Failed to fetch comments" });
    }
};

module.exports = { createComment, getCommentsByProduct };
