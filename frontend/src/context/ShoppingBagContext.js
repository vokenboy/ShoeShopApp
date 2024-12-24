import React, { createContext, useState } from "react";

export const ShoppingBagContext = createContext();

const ShoppingBagProvider = ({ children }) => {
    const [shoppingBag, setShoppingBag] = useState(
        JSON.parse(localStorage.getItem("shoppingBag")) || []
    );

    const addToBag = (product) => {
        const updatedBag = [...shoppingBag, product];
        setShoppingBag(updatedBag);
        localStorage.setItem("shoppingBag", JSON.stringify(updatedBag));
    };

    const removeFromBag = (index) => {
        const updatedBag = shoppingBag.filter((_, i) => i !== index);
        setShoppingBag(updatedBag);
        localStorage.setItem("shoppingBag", JSON.stringify(updatedBag));
    };

    return (
        <ShoppingBagContext.Provider value={{ shoppingBag, addToBag, removeFromBag }}>
            {children}
        </ShoppingBagContext.Provider>
    );
};

export default ShoppingBagProvider;
