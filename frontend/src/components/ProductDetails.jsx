import React from "react";
import { Typography, Box } from "@mui/material";

const ProductDetails = ({ 
    product, 
    selectedColor, 
    selectedSize, 
    handleAddToBag 
}) => {
    return (
        <Box>
            <Box sx={{ textAlign: "left" }}>
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {product.brand}
                </Typography>
                <Typography variant="h5" color="primary">
                    ${product.basePrice.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="text.secondary">
                    {product.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductDetails;
