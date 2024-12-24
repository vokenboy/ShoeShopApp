import React, { useEffect, useState } from "react";
import { getProducts } from "../api/ProductAPI";
import ProductCard from "./ProductCard";
import { Grid, Container, Typography, Box } from "@mui/material";

const ProductCatalogue = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ padding: "40px" }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Product Catalogue
            </Typography>
            {products.length === 0 ? (
                <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                    No products available.
                </Typography>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4} justifyContent="center">
                        {products.map((product) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={product._id}
                            >
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default ProductCatalogue;
