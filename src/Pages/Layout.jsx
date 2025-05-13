import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";
const Layout = () => {
  return (
    <>
      <TopNav />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
