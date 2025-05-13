import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";
import { Top } from "../Components/Top";
const Layout = () => {
  return (
    <>
      <TopNav />
      <Navbar />
      <Top />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
