import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/ProductAPI";
import { getCommentsByProduct } from "../api/CommentAPI";
import { ShoppingBagContext } from "../context/ShoppingBagContext";
import ProductImageSlider from "../components/ProductImageSlider";
import ProductDetails from "../components/ProductDetails";
import {
    Card,
    CircularProgress,
    Alert,
    Container,
    Box,
    Grid,
    TextField,
    MenuItem,
    Button,
    Snackbar,
    Alert as MuiAlert,
} from "@mui/material";
import CommentAdd from "../components/CommentAdd";
import CommentViews from "../components/CommentViews";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
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

        const fetchComments = async () => {
            try {
                const productComments = await getCommentsByProduct(id);
                setComments(productComments);
            } catch (err) {
                console.error("Failed to fetch comments:", err);
            }
        };

        fetchProduct();
        fetchComments();
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

        // Open the Snackbar
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    if (error) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    const currentColor = product.colors.find(
        (color) => color.colorName === selectedColor
    ) || product.colors[0];

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Card elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ProductImageSlider
                            images={currentColor?.images || []}
                            productName={product.name}
                            colorName={selectedColor || currentColor?.colorName}
                        />
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                select
                                label="Select Color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                fullWidth
                                size="medium"
                            >
                                {product.colors.map((color) => (
                                    <MenuItem key={color.colorName} value={color.colorName}>
                                        {color.colorName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ProductDetails product={product} />
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                select
                                label="Select Size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                fullWidth
                                size="medium"
                                disabled={!selectedColor}
                            >
                                {selectedColor &&
                                currentColor?.variations?.length > 0 ? (
                                    currentColor.variations.map((variation) => (
                                        <MenuItem key={variation.size} value={variation.size}>
                                            {variation.size}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No sizes available</MenuItem>
                                )}
                            </TextField>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleAddToBag}
                                fullWidth
                            >
                                Add to Bag
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <Box sx={{ mt: 5 }}>
                <CommentAdd productId={id} onCommentAdded={(newComment) => setComments((prev) => [newComment, ...prev])} />
                <Box sx={{ mt: 3 }}>
                    <CommentViews comments={comments} />
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Item added to shopping bag!
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default ProductPage;
