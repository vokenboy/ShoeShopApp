import React from "react";
import { List, ListItem, Typography, Box, Divider, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";

const CommentViews = ({ comments }) => {
    if (!comments.length) {
        return (
            <Box sx={{ mt: 4, maxWidth: "600px", margin: "0 auto" }}>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    No comments yet. Be the first to comment!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, maxWidth: "600px", margin: "0 auto" }}>
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>
            <List>
                {comments.map((comment) => (
                    <Box key={comment._id} sx={{ mb: 3 }}>
                        <ListItem
                            sx={{
                                alignItems: "flex-start",
                                gap: 2,
                                p: 2,
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Avatar>
                                {comment.userId?.name?.charAt(0).toUpperCase() || "A"}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1">
                                    <strong>{comment.userId?.name || "Anonymous"}</strong>
                                </Typography>
                                <Rating value={comment.rating} readOnly />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {comment.content}
                                </Typography>
                            </Box>
                        </ListItem>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default CommentViews;
