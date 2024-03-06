import { LogoutIcon } from "@heroicons/react/outline";
import {
  Menu,
  Heading4,
  Avatar,
  MenuList,
  MenuItem,
  MenuHandler,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import account from "../../assets/account.png";
const NavigationBar = () => {
  const nama = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  let nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/login", { replace: true });
  };
  return (
    <div>
      <nav className="w-full py-2 px-4">
        <div className="flex justify-end items-center">
          <div className="text-grey-600 text-right">
            <h3 className="font-semibold">{nama}</h3>
            <p className="text-sm">{email}</p>
          </div>
          <Menu>
            <MenuHandler>
              <Button ripple={false} variant="text">
                <Avatar src={account} size="md" variant="circular" />
              </Button>
            </MenuHandler>
            <MenuList>
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
                  <LogoutIcon className="w-7" />
                  <p className="ml-2">Logout</p>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
