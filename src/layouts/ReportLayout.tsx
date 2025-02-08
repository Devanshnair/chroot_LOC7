import React from "react";
import ReportNavbar from "../components/ReportNavbar";
import { Outlet } from "react-router-dom";


const ReportLayout = () => {
  return (
    <>
      <ReportNavbar />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default ReportLayout;
