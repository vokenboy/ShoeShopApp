import axios from "axios";

const API_BASE_URL = "https://shoe-shop-app-backend.vercel.app/api/products";

const getToken = () => localStorage.getItem("token");

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/post`, productData, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/put/${id}`,
            productData,
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};


export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
};
