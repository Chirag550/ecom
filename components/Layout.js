import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="layout">
      <Head>
        <title>Chirag Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
