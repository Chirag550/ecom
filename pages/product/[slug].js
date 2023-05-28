import React, { useState } from "react";
import Image from "next/image";
import { Toast } from "react-hot-toast";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client } from "@/lib";
import { urlfor } from "@/lib";
import Product from "@/components/Product";
import { usestatecontext } from "@/context/statecontext";
import { Toaster } from "react-hot-toast";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, _id } = product;
  const [index, setIndex] = useState(0);
  const { qty, incqty, decqty, onAdd, setshowcart } = usestatecontext();

  const handlebuy = () => {
    onAdd(product, qty);
    setshowcart(true);
  };

  return (
    <div>
      <Toaster />
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <picture>
              <img
                src={urlfor(image && image[index])}
                className="product-detail-image"
                alt="heyyy"
              />
            </picture>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <picture>
                <img
                  key={i}
                  src={urlfor(item)}
                  alt="heyy"
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              </picture>
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decqty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incqty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handlebuy}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {console.log(product)}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <br></br>
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} products={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
