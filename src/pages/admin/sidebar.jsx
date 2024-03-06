import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClipboardListIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Tab, TabItem, TabList } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import text from "../../assets/text.png";

const Sidebar = () => {
  const tabs = [
    { name: "Data", logo: <ChartBarIcon className="h-9" />, to: "data" },
    {
      name: "User Account",
      logo: <UsersIcon className="h-9" />,
      to: "account",
    },
    { name: "Course", logo: <BookOpenIcon className="h-9" />, to: "course" },
    { name: "Task", logo: <ClipboardListIcon className="h-9" />, to: "task" },
  ];
  const [openTab, setOpenTab] = React.useState(
    localStorage.getItem("tabadmin")
  );
  const open = (i) => {
    localStorage.setItem("tabadmin", i);
    setOpenTab(localStorage.getItem("tabadmin"));
  };

  return (
    <div>
      <div className="h-screen fixed top-0 md:left-0 -left-64 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-40 py-4 px-6 transition-all duration-300">
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <Link to='/user/course'>
            <span className="text-center inline-block w-full mt-0">
              <img src={text} alt="bimbelz" className=" w-full" />
            </span>
          </Link>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />
            <ul className="flex-col min-w-full flex list-none">
              {tabs.map((tab, i) => (
                <li key={i} className="rounded-lg mb-4">
                  <Link to={tab.to}>
                    <p
                      onClick={(e) => {
                        open(i);
                      }}
                      href=""
                      className={`${
                        parseInt(localStorage.getItem("tabadmin")) === i
                          ? "bg-gradient-to-tr from-cyan-500 to-sky-300 text-white shadow-md"
                          : "text-grey-700 hover:text-cyan-600"
                      } flex items-center gap-4 text-sm px-4 py-3 rounded-lg`}
                    >
                      {tab.logo} {tab.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
