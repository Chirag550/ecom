import React from "react";
import Link from "next/link";
import { urlfor } from "@/lib";
import Image from "next/image";
const Herobanner = ({ Herobanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{Herobanner.smallText}</p>
        <h3>{Herobanner.midText}</h3>
        <h1>{Herobanner.largeText1}</h1>
        <Image
          src={urlfor(Herobanner.image)}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${Herobanner.product}`}>
            <button type="button">
              {Herobanner.buttonText}
              {console.log(Herobanner.product)}
            </button>
          </Link>
          <div className="desc">
            <h5>{Herobanner.desc}</h5>
            <p>{Herobanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
