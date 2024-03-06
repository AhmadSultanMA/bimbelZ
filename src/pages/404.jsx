import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import notfound from "../assets/404notfound.png";

const Pagenotfound = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="flex flex-col justify-center">
        <img src={notfound} alt="" className="" />
        <Link to="/user">
          <div className="flex space-x-2 items-center mt-2 w-fit text-cyan-700 cursor-pointer hover:text-cyan-400 mx-auto font-semibold">
            <ArrowLeftIcon className="h-6" />
            <p className="">back to the home</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Pagenotfound;
