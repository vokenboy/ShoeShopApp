import React from "react";
import {
    Card,
    CardContent,
    Typography,
    useTheme,
    Box,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const defaultImage =
        product.colors?.[0]?.images?.[0] || "https://via.placeholder.com/300";

    return (
        <Card
            sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: "100%", // Ensure responsive width
                maxWidth: "320px", // Cap the width for larger screens
                cursor: "pointer",
                boxShadow: theme.shadows[4],
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                },
                backgroundColor: theme.palette.background.default,
            }}
            onClick={handleCardClick}
        >
            <Box
                sx={{
                    position: "relative",
                    height: "200px",
                    backgroundImage: `url(${defaultImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover .overlay": {
                        opacity: 0, // Hide overlay on hover
                    },
                }}
            >
                <Box
                    className="overlay"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2))",
                        transition: "opacity 0.3s ease-in-out",
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        zIndex: 2,
                    }}
                >
                    {product.brand}
                </Typography>
            </Box>

            <CardContent
                sx={{
                    padding: "16px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 600,
                        marginBottom: "8px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                >
                    ${product.basePrice.toFixed(2)}
                </Typography>

                <Divider
                    sx={{
                        width: "50%",
                        margin: "12px auto",
                        borderColor: theme.palette.divider,
                    }}
                />

                <Button
                    variant="contained"
                    size="medium"
                    sx={{
                        marginTop: "8px",
                        borderRadius: "20px",
                        textTransform: "none",
                        padding: "8px 24px",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                    }}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
