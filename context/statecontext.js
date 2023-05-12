import React, { useEffect, useState, createContext, useContext } from "react";
import toast from "react-hot-toast";

const context = createContext();

export const StateContext = (props) => {
  const [showcart, setshowcart] = useState(false);

  const [cartitems, setcartitems] = useState([]);

  const [price, setprice] = useState(0);

  const [totalquantities, settotalquanitities] = useState(0);

  const [qty, setqty] = useState(1);

  let foundproduct;
  let index;

  const incqty = () => {
    setqty((prev) => prev + 1);
  };

  const decqty = () => {
    setqty((prev) => {
      if (prev - 1 < 1) return 1;

      return prev - 1;
    });
  };

  const onAdd = (product, quantity) => {
    console.log(cartitems);
    // const checkProductInCart = cartitems.find(
    //   (item) => item._id === product._id
    // );

    setprice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    settotalquanitities(
      (prevTotalQuantities) => +(prevTotalQuantities + quantity)
    );

    if (cartitems.find((item) => item?._id === product._id)) {
      const updatedCartItems = cartitems.map((cartProduct) => {
        if (cartProduct?._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setcartitems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setcartitems([...cartitems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };
  const remove = (product) => {
    foundproduct = cartitems.find((item) => item._id === product._id);
    const newcartitems = cartitems.filter((item) => item._id !== product._id);
    setcartitems(newcartitems);
    setprice((prev) => prev - foundproduct.price * foundproduct.quantity);
    settotalquanitities((prev) => prev - foundproduct.quantity);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundproduct = cartitems.find((item) => item._id === id);
    index = cartitems.findIndex((item) => item._id === id);
    const newcartitems = cartitems.filter((item) => item._id !== id);
    if (value === "inc") {
      setcartitems([
        { ...foundproduct, quantity: foundproduct.quantity + 1 },
        ...newcartitems,
      ]);
      setprice((prev) => price + foundproduct.price);
      settotalquanitities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundproduct.quantity > 1) {
        setcartitems([
          { ...foundproduct, quantity: foundproduct.quantity - 1 },
          ...newcartitems,
        ]);
        setprice((prev) => price - foundproduct.price);
        settotalquanitities((prev) => prev - 1);
      }
    }
  };
  return (
    <context.Provider
      value={{
        toggleCartItemQuantity,
        showcart,
        cartitems,
        price,
        totalquantities,
        qty,
        setshowcart,
        incqty,
        decqty,
        onAdd,
        remove,
        settotalquanitities,
        setcartitems,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
export const usestatecontext = () => useContext(context);
