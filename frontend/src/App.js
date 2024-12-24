import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ManageProductsPage from "./pages/ManageProductsPage";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ShoppingBagProvider from "./context/ShoppingBagContext";
import { lightTheme, darkTheme } from "./Theme";

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <ShoppingBagProvider>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <AuthProvider>
                    <Router>
                        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/manage-products" element={<ManageProductsPage />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </ShoppingBagProvider>
    );
};

export default App;
