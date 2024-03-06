import {
  MenuItem,
  Ava,
  Avatar,
  MenuItemtar,
  Menu,
  MenuHandler,
  Button,
  MenuList,
} from "@material-tailwind/react";
import text from "../../assets/text.png";
import account from "../../assets/account.png";
import React from "react";
import { CogIcon, DatabaseIcon, LogoutIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const Navus = () => {
  const nama = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  let nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/login", { replace: true });
  };
  return (
    <div>
      <nav className="w-full px-6 bg-cyan-800 shadow-lg fixed z-40 top-0">
        <div className="flex items-center justify-between">
          <span className="cursor-pointer">
            <a
              className="border-0"
              onClick={(e) => {
                nav("/user", { replace: true });
              }}
            >
              <Avatar src={text} className="w-32" />
            </a>
          </span>
          <div className="flex justify-end items-center">
            <div className="text-white text-right hidden sm:block lg:block">
              <h3 className="font-semibold">{nama}</h3>
              <p className="text-sm">{email}</p>
            </div>
            <Menu>
              <div className="lg:hidden p-4">
                <h3 className="font-semibold">{nama}</h3>
                <p className="text-sm">{email}</p>
                <hr className="mt-3" />
              </div>
              <MenuHandler>
                <Button ripple={false} variant="text">
                  <Avatar src={account} variant="circular" size="md" />
                </Button>
              </MenuHandler>
              <MenuList>
                {localStorage.getItem("role") === "admin" ? (
                  <MenuItem
                    href="#"
                    color="cyan"
                    ripple="light"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem("tabadmin", 0);
                      nav("/admin", { replace: true });
                    }}
                  >
                    <div className="flex items-center">
                      <DatabaseIcon className="w-6" />
                      <p className="ml-2">Dashboard</p>
                    </div>
                  </MenuItem>
                ) : (
                  <div></div>
                )}
                <MenuItem
                  href="#"
                  color="cyan"
                  ripple="light"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex items-center">
                    <CogIcon className="w-6" />
                    <p className="ml-2">Setting</p>
                  </div>
                </MenuItem>
                <MenuItem
                  href="#"
                  color="cyan"
                  ripple="light"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  <div className="flex items-center">
                    <LogoutIcon className="w-6" />
                    <p className="ml-2">Logout</p>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navus;
