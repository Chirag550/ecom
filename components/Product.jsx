import Link from "next/link";
import React from "react";
import { urlfor } from "@/lib";

const Product = ({ products: { image, name, slug, price } }) => {
  return (
    <div>
      <h1>{name}</h1>
      <br></br>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlfor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price ">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
