import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navus from "./navbar";

const Murid = () => {
  return (
    <div>
      <Navus />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};
export default Murid;
