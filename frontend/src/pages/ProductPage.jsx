import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/ProductAPI";
import { ShoppingBagContext } from "../context/ShoppingBagContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Container,
    Button,
    MenuItem,
    TextField,
    Box,
} from "@mui/material";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(""); // For color selection
    const { addToBag } = useContext(ShoppingBagContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (err) {
                setError("Failed to fetch product details.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToBag = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select both a size and a color before adding to the bag.");
            return;
        }

        const colorData = product.colors.find(
            (color) => color.colorName === selectedColor
        );

        addToBag({
            ...product,
            selectedSize,
            selectedColor,
            price: product.basePrice,
            colorImages: colorData?.images,
        });

        alert(
            `${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) has been added to your shopping bag.`
        );
    };

    if (error) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    const images =
        product.colors?.find((color) => color.colorName === selectedColor)?.images ||
        product.colors?.[0]?.images ||
        [];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Card
                sx={{
                    width: "80%", // Set card width relative to container
                    maxWidth: "1400px", // Limit maximum width for large screens
                    margin: "0 auto", // Center card horizontally
                    padding: "24px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: "16px",
                    minHeight: "700px", // Increased card height
                }}
            >
                <Box sx={{ width: "400px" }}>
                    <Slider {...sliderSettings}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product image ${index + 1}`}
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        ))}
                    </Slider>
                </Box>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        <strong>Brand:</strong> {product.brand}
                    </Typography>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        <strong>Price:</strong> ${product.basePrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {product.description}
                    </Typography>
                    <TextField
                        select
                        label="Color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {product.colors?.map((color) => (
                            <MenuItem key={color.colorName} value={color.colorName}>
                                {color.colorName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                        disabled={!selectedColor}
                    >
                        {selectedColor &&
                            product.colors
                                ?.find((color) => color.colorName === selectedColor)
                                ?.variations.map((variation) => (
                                    <MenuItem key={variation.size} value={variation.size}>
                                        {variation.size}
                                    </MenuItem>
                                ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddToBag}
                        disabled={!product.colors || !selectedColor || !selectedSize}
                    >
                        Add to Shopping Bag
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductPage;
