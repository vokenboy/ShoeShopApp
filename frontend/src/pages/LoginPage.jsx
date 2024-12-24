import React, { useState, useContext } from "react";
import { login } from "../api/AuthAPI";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token, role, id } = await login(email, password);

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("id", id);

            setUser({ role, id });

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
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
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
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
                            Login
                        </Button>
                    </Box>
                </form>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2 }}
                >
                    Don't have an account? <a href="/register">Register here</a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
