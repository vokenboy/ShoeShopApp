import axios from "axios";

const API_BASE_URL = "https://shoe-shop-app-backend.vercel.app/api/users";

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/post`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to create user.";
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch user.";
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update user.";
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete user.";
    }
};
