import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { addComment } from "../api/CommentAPI";
import Rating from "@mui/material/Rating";

const CommentAdd = ({ productId, onCommentAdded }) => {
    const [commentContent, setCommentContent] = useState("");
    const [commentRating, setCommentRating] = useState(5);

    const handleAddComment = async () => {
        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("User is not logged in.");
            return alert("You must be logged in to add a comment.");
        }

        try {
            const newComment = await addComment(productId, commentContent, commentRating, userId);
            onCommentAdded(newComment);
            setCommentContent("");
            setCommentRating(5);
        } catch (err) {
            console.error("Failed to add comment:", err);
            alert("Failed to add comment");
        }
    };

    return (
        <Box
            sx={{
                mt: 4,
                p: 3,
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#fefefe",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Add a Comment
            </Typography>
            <TextField
                label="Comment"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ mr: 1 }}>Rating:</Typography>
                <Rating
                    name="comment-rating"
                    value={commentRating}
                    onChange={(e, newValue) => setCommentRating(newValue)}
                />
            </Box>
            <Button variant="contained" color="primary" fullWidth onClick={handleAddComment}>
                Submit
            </Button>
        </Box>
    );
};

export default CommentAdd;
