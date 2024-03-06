import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  MinusCircleIcon,
  RefreshIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Tab, TabItem, TabList } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import text from "../../../assets/text.png";
import { urlBab } from "../../../url";
import Lesson from "./lesson";

const Sidebar = ({ setCheck, setLength, setL, setI }) => {
  const [bab, setBab] = React.useState([]);
  const [tes, setTes] = React.useState();
  const [loading, setLoading] = React.useState(false);
  let { state } = useLocation();
  let { id } = state;

  const getBab = async () => {
    setLoading(true);
    await axios
      .get(urlBab + `/${id}`)
      .then(function (response) {
        const data = response;
        setBab(data.data.data);
        setLoading(false);
      })
      .catch();
  };

  useEffect(() => {
    getBab();
  }, []);

  return (
    <div>
      <div className="h-screen fixed top-0 md:left-0 -left-80 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-80 pb-4 pt-24 px-6 transition-all duration-300">
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className="flex flex-col">
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <RefreshIcon className="h-7 stroke-cyan-700 animate-spin" />
              </div>
            ) : (
              <div>
                {bab.length === 0 ? (
                  <div className="rounded-lg hover:bg-cyan-100 py-3 px-3 items-center text-cyan-700 flex space-x-2">
                    <MinusCircleIcon className="h-6" />
                    <p>Tidak ada section apapun disini</p>
                  </div>
                ) : (
                  <Accordion allowMultiple>
                    {bab.map((item, i) => (
                      <AccordionItem key={i}>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <h1 className="text-lg font-semibold">
                              {item.bab.judul}
                            </h1>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <Lesson
                          setCheck={setCheck}
                          bab1={bab[0].bab}
                          bab={item.bab}
                          setLength={setLength}
                          setL={setL}
                          setI={setI}
                          setTes={setTes}
                        />
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
