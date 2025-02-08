import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Maplayout = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Maplayout;
