import React, { useState } from "react";
import { createUser } from "../api/UserAPI";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const userData = { name, email, password, role: "User" };
            const response = await createUser(userData);
            alert(response.message || "User registered successfully!");
            navigate("/login");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ padding: "32px" }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    textAlign="center"
                >
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            type="text"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Register
                        </Button>
                    </Box>
                </form>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2 }}
                >
                    Already have an account? <a href="/login">Login here</a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
