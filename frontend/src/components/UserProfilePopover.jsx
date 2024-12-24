import React, { useState, useEffect } from "react";
import {
    Popover,
    Box,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import { getUserById } from "../api/UserAPI";

const UserProfilePopover = ({ anchorEl, onClose, userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId && anchorEl) {
            // Fetch user data when the popover opens
            setLoading(true);
            getUserById(userId)
                .then((fetchedUser) => {
                    setUser(fetchedUser);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId, anchorEl]);

    const open = Boolean(anchorEl);
    const id = open ? "user-profile-popover" : undefined;

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
                sx: { width: 250, p: 2, borderRadius: "8px" },
            }}
        >
            <Box>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : user ? (
                    <>
                        <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
                            Profile
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem>
                                <ListItemText primary="Name" secondary={user.name || "N/A"} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email" secondary={user.email || "N/A"} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Role" secondary={user.role || "N/A"} />
                            </ListItem>
                        </List>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => alert("Edit Profile clicked!")}
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography textAlign="center" sx={{ p: 2 }}>
                        Failed to load user data.
                    </Typography>
                )}
            </Box>
        </Popover>
    );
};

export default UserProfilePopover;
