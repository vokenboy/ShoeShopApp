import { createTheme } from "@mui/material/styles";

const sharedStyles = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "none",
                ":hover": {
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main", // Use primary color
                        borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main", // Use primary color
                        borderWidth: "2px",
                    },
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#697565", // Olive Gray
        },
        secondary: {
            main: "#3C3D37", // Darker Gray
        },
        background: {
            default: "#ECDFCC", // Light Cream
            paper: "#FFFFFF", // Pure White
        },
        text: {
            primary: "#181C14", // Deep Green
            secondary: "#3C3D37", // Darker Gray
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    backgroundColor: "#ECDFCC",
                },
                a: {
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#697565",
                },
                "a:focus": {
                    outline: "none",
                },
            },
        },
        ...sharedStyles,
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "#697565",
                    color: "#ECDFCC",
                    ":hover": {
                        backgroundColor: "#4E564E",
                    },
                },
                outlined: {
                    borderColor: "#697565",
                    color: "#697565",
                    ":hover": {
                        borderColor: "#4E564E",
                        backgroundColor: "rgba(105, 117, 101, 0.1)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#697565",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#697565",
                        },
                    },
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3C3D37", // Darker Gray
        },
        secondary: {
            main: "#697565", // Olive Gray
        },
        background: {
            default: "#181C14", // Deep Green
            paper: "#3C3D37", // Darker Gray
        },
        text: {
            primary: "#ECDFCC", // Light Cream
            secondary: "#fffff", // Olive Gray
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    backgroundColor: "#181C14",
                },
                a: {
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#ECDFCC",
                },
                "a:focus": {
                    outline: "none",
                },
            },
        },
        ...sharedStyles,
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "#3C3D37",
                    color: "#ECDFCC",
                    ":hover": {
                        backgroundColor: "#2B2C27",
                    },
                },
                outlined: {
                    borderColor: "#3C3D37",
                    color: "#ECDFCC",
                    ":hover": {
                        borderColor: "#2B2C27",
                        backgroundColor: "rgba(60, 61, 55, 0.1)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#3C3D37",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#697565",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#697565",
                        },
                    },
                },
            },
        },
    },
});
