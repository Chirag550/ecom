import React, { useEffect, useState } from "react";
import Link from "next/link";
import BsBagCheckFill from "react-iccons/bs";

import { usestatecontext } from "@/context/statecontext";

import { runfire } from "@/utils";
const success = () => {
  const { setcaritems, setprice, settotalquanitities } = usestatecontext();

  useEffect(() => {
    localStorage.clear();
    setcaritems([]);
    setprice(0);
    settotalquanitities(0);
    runfire();
  }, []);

  const [order, setOrder] = useState(null);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You for your order</h2>
        <p className="email-msg">check your email inbox for the receipt</p>
        <p className="description">
          If you have any question , please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
