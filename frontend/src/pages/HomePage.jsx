import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import ProductCatalogue from "../components/ProductCatalogue";

const HomePage = () => {
    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    py: 6,
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to Our Store
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                    Discover the best products at unbeatable prices
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    href="#catalogue"
                >
                    Browse Products
                </Button>
            </Box>

            <Container
                maxWidth="md"
                sx={{
                    py: 6,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Why Shop With Us?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    We offer a wide range of high-quality products to meet all your needs.
                    Enjoy fast delivery, secure payments, and top-notch customer service.
                </Typography>
            </Container>

            <Box id="catalogue">
                <ProductCatalogue />
            </Box>
        </Box>
    );
};

export default HomePage;
