import React, { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
} from "@mui/material";
import {
    ShoppingBag as ShoppingBagIcon,
    AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingBagContext } from "../context/ShoppingBagContext";
import ShoppingBagPopover from "./ShoppingBagPopover";
import UserProfilePopover from "./UserProfilePopover";

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { user, setUser } = useContext(AuthContext);
    const { shoppingBag } = useContext(ShoppingBagContext);
    const [bagAnchorEl, setBagAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.clear();
            setUser(null);
            window.location.href = "/login";
        }
    };

    const handleBagClick = (event) => {
        setBagAnchorEl(bagAnchorEl ? null : event.currentTarget);
    };

    const handleProfileClick = (event) => {
        setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        style={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                        component={Link}
                        to="/"
                    >
                        My App
                    </Typography>
                    <Box>
                        {!user && (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="inherit"
                                    style={{ textTransform: "none" }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    color="inherit"
                                    style={{ textTransform: "none" }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                        {user?.role === "Admin" && (
                            <Button
                                component={Link}
                                to="/admin"
                                color="inherit"
                                style={{ textTransform: "none" }}
                            >
                                Admin Dashboard
                            </Button>
                        )}
                        {user?.role === "Poster" && (
                            <Button
                                component={Link}
                                to="/manage-products"
                                color="inherit"
                                style={{ textTransform: "none" }}
                            >
                                Manage Products
                            </Button>
                        )}
                        {user?.role === "User" && (
                            <>
                                <IconButton
                                    color="inherit"
                                    aria-label="shopping bag"
                                    onClick={handleBagClick}
                                >
                                    <Badge
                                        badgeContent={shoppingBag.length}
                                        color="error"
                                        overlap="circular"
                                    >
                                        <ShoppingBagIcon />
                                    </Badge>
                                </IconButton>
                                <ShoppingBagPopover
                                    anchorEl={bagAnchorEl}
                                    onClose={() => setBagAnchorEl(null)}
                                />
                                <IconButton
                                    color="inherit"
                                    aria-label="profile"
                                    onClick={handleProfileClick}
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                <UserProfilePopover
                                    anchorEl={profileAnchorEl}
                                    onClose={() => setProfileAnchorEl(null)}
                                    userId={user.id}
                                />
                            </>
                        )}
                        {user && (
                            <Button
                                color="inherit"
                                style={{ textTransform: "none" }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                        <Button
                            color="inherit"
                            onClick={toggleTheme}
                            style={{ textTransform: "none" }}
                        >
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Navbar;
