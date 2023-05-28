import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { usestatecontext } from "@/context/statecontext";
import { urlfor } from "@/lib";
import getStripe from "@/getstripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    price,
    totalquantities,
    cartitems,
    setshowcart,
    toggleCartItemQuantity,
    remove,
  } = usestatecontext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartitems),
    });
    console.log(response);

    if (response.statusCode === 500) return;

    const data = await response.json();
    console.log(data);

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setshowcart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">{totalquantities}</span>
        </button>

        {cartitems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h2> your shopping bag is empty</h2>
            <Link href="/">
              <button
                type="button"
                onClick={() => setshowcart(false)}
                className="btn"
              >
                continue
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartitems?.length >= 1 &&
            cartitems.map((item) => (
              <div className="product" key={item._id}>
                <picture>
                  <img
                    src={urlfor(item?.image[0])}
                    className="cart-product-image"
                    alt="heyy"
                  />
                </picture>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => remove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartitems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>SubTotal:</h3>
              <h3>${price}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
