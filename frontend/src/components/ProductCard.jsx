import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    // Get the first color's image or a placeholder
    const defaultImage =
        product.colors?.[0]?.images?.[0] || "https://via.placeholder.com/300";

    return (
        <Card
            sx={{
                borderRadius: "8px",
                padding: "16px",
                width: "300px",
                margin: "10px",
                textAlign: "center",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                cursor: "pointer",
                "&:hover": {
                    boxShadow: theme.shadows[6],
                },
            }}
            onClick={handleCardClick}
        >
            <CardMedia
                component="img"
                height="200"
                image={defaultImage}
                alt={product.name}
                sx={{ borderRadius: "4px" }}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                </Typography>
                <Typography
                    variant="body2"
                    color={theme.palette.text.secondary}
                    gutterBottom
                >
                    {product.brand}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight="bold"
                    color={theme.palette.text.primary}
                >
                    ${product.basePrice.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
