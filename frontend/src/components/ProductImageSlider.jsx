import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductImageSlider = ({ images, productName, colorName }) => {
    const isMobile = window.innerWidth <= 768;

    const CustomPrevArrow = ({ onClick }) => (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                width: "30px",
                height: "30px",
                padding: "5px",
            }}
        >
            <ArrowBackIosNewIcon sx={{ fontSize: "18px" }} />
        </IconButton>
    );

    const CustomNextArrow = ({ onClick }) => (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                width: "30px",
                height: "30px",
                padding: "5px",
            }}
        >
            <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: isMobile ? null : <CustomPrevArrow />,
        nextArrow: isMobile ? null : <CustomNextArrow />,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`${productName} - ${colorName}`}
                    style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            ))}
        </Slider>
    );
};

export default ProductImageSlider;
