import React, { useState, useEffect } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../api/ProductAPI";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    TextField,
    Box,
} from "@mui/material";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [addForm, setAddForm] = useState({
        name: "",
        brand: "",
        basePrice: "",
        description: "",
        colors: [],
    });
    const [editForm, setEditForm] = useState({
        _id: "",
        name: "",
        brand: "",
        basePrice: "",
        description: "",
        colors: [],
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query)
            )
        );
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddForm({ ...addForm, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const handleAddSubmit = async () => {
        try {
            await createProduct(addForm);
            setAddModalOpen(false);
            setAddForm({
                name: "",
                brand: "",
                basePrice: "",
                description: "",
                colors: [],
            });
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleEditSubmit = async () => {
        try {
            await updateProduct(editForm._id, editForm);
            setEditModalOpen(false);
            setEditForm({
                _id: "",
                name: "",
                brand: "",
                basePrice: "",
                description: "",
                colors: [],
            });
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditForm(product); // Pass the selected product to the edit form
        setEditModalOpen(true);
    };

    const handleDelete = async (_id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(_id);
                const updatedProducts = await getProducts();
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Manage Products
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAddModalOpen(true)}
                >
                    Add Product
                </Button>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ width: "300px" }}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Base Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Colors</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    {product.colors[0]?.images[0] && (
                                        <Avatar
                                            src={product.colors[0].images[0]}
                                            alt={product.name}
                                            variant="square"
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: "8px",
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>${product.basePrice ? `${product.basePrice.toFixed(2)}` : "N/A"}</TableCell>
                                <TableCell
                                    sx={{
                                        maxWidth: 200,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {product.description}
                                </TableCell>
                                <TableCell>
                                    {product.colors.map((color, index) => (
                                        <Typography
                                            key={index}
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {color.colorName} ({color.variations.length} sizes)
                                        </Typography>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(product)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddProductModal
                open={addModalOpen}
                handleClose={() => setAddModalOpen(false)}
                form={addForm}
                handleChange={handleAddChange}
                handleSubmit={handleAddSubmit}
            />
            <EditProductModal
                open={editModalOpen}
                handleClose={() => setEditModalOpen(false)}
                form={editForm}
                handleChange={handleEditChange}
                handleSubmit={handleEditSubmit}
            />
        </Container>
    );
};

export default ManageProductsPage;
