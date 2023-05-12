import Herobanner from "@/components/Herobanner";
import React from "react";
import { client } from "@/lib";
import { urlfor } from "@/lib";
import Product from "@/components/Product";
import FooterBanner from "@/components/FooterBanner";
// import FooterBanner from "@/components/footerbanner";

const index = ({ products, bannerdata }) => {
  return (
    <>
      <Herobanner Herobanner={bannerdata[0]} />
      <div className="products-heading">
        <h2>Best Selling product</h2>
        <p>speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} products={product} />
        ))}
      </div>

      <FooterBanner footerbanner={bannerdata[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  const query1 = '*[_type=="banner"]';
  const bannerdata = await client.fetch(query1);

  return {
    props: {
      products,
      bannerdata,
    },
  };
};
export default index;
