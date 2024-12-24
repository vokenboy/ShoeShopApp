import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    List,
    ListItem,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditProductModal = ({ open, handleClose, form, handleChange, handleSubmit }) => {
    const [colorInput, setColorInput] = useState({
        colorName: "",
        images: [],
        variations: [],
    });
    const [imageInput, setImageInput] = useState("");
    const [variationInput, setVariationInput] = useState({
        size: "",
        count: "",
    });

    const handleColorAdd = () => {
        handleChange({
            target: {
                name: "colors",
                value: [...form.colors, { ...colorInput }],
            },
        });
        setColorInput({ colorName: "", images: [], variations: [] });
    };

    const handleImageAdd = () => {
        setColorInput({
            ...colorInput,
            images: [...colorInput.images, imageInput],
        });
        setImageInput("");
    };

    const handleVariationAdd = () => {
        setColorInput({
            ...colorInput,
            variations: [...colorInput.variations, { ...variationInput }],
        });
        setVariationInput({ size: "", count: "" });
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...colorInput.images];
        updatedImages.splice(index, 1);
        setColorInput({ ...colorInput, images: updatedImages });
    };

    const handleVariationRemove = (index) => {
        const updatedVariations = [...colorInput.variations];
        updatedVariations.splice(index, 1);
        setColorInput({ ...colorInput, variations: updatedVariations });
    };

    const handleColorRemove = (index) => {
        const updatedColors = [...form.colors];
        updatedColors.splice(index, 1);
        handleChange({
            target: {
                name: "colors",
                value: updatedColors,
            },
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                {/* Basic Product Details */}
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Brand"
                    name="brand"
                    value={form.brand || ""}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Base Price"
                    name="basePrice"
                    type="number"
                    value={form.basePrice || ""}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={form.description || ""}
                    onChange={handleChange}
                    required
                />

                {/* Edit Colors Section */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Edit Colors
                </Typography>
                <List>
                    {form.colors.map((color, index) => (
                        <ListItem key={index} sx={{ flexDirection: "column", alignItems: "start" }}>
                            <Typography variant="body1">{color.colorName}</Typography>
                            <Typography variant="body2">
                                Images: {color.images.join(", ")}
                            </Typography>
                            <List>
                                {color.variations.map((variation, vIndex) => (
                                    <ListItem
                                        key={vIndex}
                                        sx={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Typography variant="body2">
                                            Size: {variation.size}, Count: {variation.count}
                                        </Typography>
                                        <IconButton
                                            onClick={() =>
                                                handleVariationRemove(index, vIndex)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <IconButton onClick={() => handleColorRemove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>

                {/* Add Colors Section */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Add Colors
                </Typography>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Color Name"
                    name="colorName"
                    value={colorInput.colorName}
                    onChange={(e) =>
                        setColorInput({ ...colorInput, colorName: e.target.value })
                    }
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Manage Images
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
                    <TextField
                        label="Image URL"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleImageAdd}>
                        Add Image
                    </Button>
                </Box>
                <List>
                    {colorInput.images.map((image, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">{image}</Typography>
                            <IconButton onClick={() => handleImageRemove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>

                {/* Add Size Variations */}
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Manage Size Variations
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
                    <TextField
                        label="Size"
                        value={variationInput.size}
                        onChange={(e) =>
                            setVariationInput({ ...variationInput, size: e.target.value })
                        }
                    />
                    <TextField
                        label="Count"
                        type="number"
                        value={variationInput.count}
                        onChange={(e) =>
                            setVariationInput({ ...variationInput, count: e.target.value })
                        }
                    />
                    <Button variant="contained" onClick={handleVariationAdd}>
                        Add Variation
                    </Button>
                </Box>
                <List>
                    {colorInput.variations.map((variation, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">
                                Size: {variation.size}, Count: {variation.count}
                            </Typography>
                            <IconButton onClick={() => handleVariationRemove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Button variant="outlined" onClick={handleColorAdd} sx={{ mt: 2 }}>
                    Add Color
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Update Product
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;