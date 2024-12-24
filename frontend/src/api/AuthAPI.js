import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};
