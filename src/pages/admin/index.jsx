import React from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Sidebar />
          {/* <Navbar setSlug={setSlug}/> */}
        </div>

        <div className="col-span-12 md:col-span-10">
          <div className=""><Navbar/></div>
          <div className="mx-0 md:mx-20 mt-5"><Outlet/></div>    
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
