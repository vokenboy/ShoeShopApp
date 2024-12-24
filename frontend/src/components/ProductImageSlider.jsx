import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImageSlider = ({ images, productName, colorName }) => {
    return (
        <Slider>
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
