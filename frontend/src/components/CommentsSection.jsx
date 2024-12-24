import React from "react";
import { Box } from "@mui/material";
import CommentAdd from "../components/CommentAdd";
import CommentViews from "../components/CommentViews";

const CommentsSection = ({ comments, setComments, productId }) => {
    return (
        <Box sx={{ mt: 5 }}>
            <CommentAdd productId={productId} onCommentAdded={(newComment) => setComments((prev) => [newComment, ...prev])} />
            <Box sx={{ mt: 3 }}>
                <CommentViews comments={comments} />
            </Box>
        </Box>
    );
};

export default CommentsSection;
