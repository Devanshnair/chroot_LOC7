import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Maplayout = () => {
  return (
    <>
      
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Maplayout;
