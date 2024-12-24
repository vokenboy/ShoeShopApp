import axios from "axios";

const API_BASE_URL = "https://shoe-shop-app-backend.vercel.app/api/comments";

const getToken = () => localStorage.getItem("token");

export const addComment = async (productId, content, rating, userId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/post`,
            { productId, content, rating, userId }, // Ensure userId is included
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error.response?.data?.message || "Failed to add comment.";
    }
};

export const getCommentsByProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error.response?.data?.message || "Failed to fetch comments.";
    }
};
