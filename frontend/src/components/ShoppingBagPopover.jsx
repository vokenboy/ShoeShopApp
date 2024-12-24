import React, { useContext } from "react";
import {
    Popover,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingBagContext } from "../context/ShoppingBagContext";

const ShoppingBagPopover = ({ anchorEl, onClose }) => {
    const { shoppingBag, removeFromBag } = useContext(ShoppingBagContext);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const id = open ? "shopping-bag-popover" : undefined;

    const handleCheckout = () => {
        onClose(); // Close the popover before navigating
        navigate("/checkout");
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                sx: { width: 300, borderRadius: "8px", p: 2 },
            }}
        >
            <Box>
                <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                    Shopping Bag
                </Typography>
                <Divider />
                {shoppingBag.length === 0 ? (
                    <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                        Your bag is empty.
                    </Typography>
                ) : (
                    <List>
                        {shoppingBag.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <ListItemText
                                    primary={item.name}
                                    secondary={`$${item.price.toFixed(2)}`}
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => removeFromBag(index)}
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                )}
                {shoppingBag.length > 0 && (
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    </Box>
                )}
            </Box>
        </Popover>
    );
};

export default ShoppingBagPopover;
