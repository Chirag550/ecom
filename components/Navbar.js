import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { usestatecontext } from "@/context/statecontext";
import Cart from "./Cart";
const Navbar = () => {
  const { showcart, setshowcart, totalquantities } = usestatecontext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">TCM STORE</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setshowcart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalquantities}</span>
      </button>
      {showcart && <Cart />}
    </div>
  );
};

export default Navbar;
