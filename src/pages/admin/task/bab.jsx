import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { MinusCircleIcon } from "@heroicons/react/outline";
import {
  Card,
  CardBody,
  Tab,
  TabItem,
  TabList,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { urlBab } from "../../../url";
import Lesson from "./lesson";

const Bab = ({ idKursus }) => {
  const [bab, setBab] = React.useState([]);
  const getBab = async () => {
    await axios
      .get(urlBab + `/${idKursus}`)
      .then(function (response) {
        const data = response;
        setBab(data.data.data);
      })
      .catch();
  };

  useEffect(() => {
    getBab();
  }, []);

  return (
    <div>
      {bab.length === 0 ? (
        <div className="rounded-lg hover:bg-cyan-100 py-3 px-3 items-center text-cyan-700 flex space-x-2">
          <MinusCircleIcon className="h-6"/>
          <p>Tidak ada section apapun disini</p>
        </div>
      ) : (
        <Accordion allowMultiple>
          {bab.map((item, i) => (
            <AccordionItem key={i}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <h1 className="text-lg font-semibold">{item.bab.judul}</h1>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <Lesson materi={item.materi} />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Bab;
