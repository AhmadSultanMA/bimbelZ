import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  DialogFocusScope,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  Input,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlBab, urlSaveBab } from "../../../url";
import Lesson from "./lesson";

const Bab = () => {
  const [bab, setBab] = React.useState([]);
  const [judul, setJudul] = React.useState();
  const [dialog, setDialog] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState();
  let { state } = useLocation();
  let toast = useToast();
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
      .catch((e) => {
        const message = e.response.data.message;
        setLoading(false);
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const saveBab = async () => {
    setBtn(true);
    await axios
      .post(urlSaveBab, {
        judul: judul,
        idKursus: id,
      })
      .then(function (response) {
        getBab();
        setBtn(false);
        setDialog(false);
        toast({
          title: "Section Created.",
          description: "We've created a section for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false);
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    getBab();
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex justify-between">
            <div className="w-1/12">
              <Link to="/admin/course" replace={true}>
                <Button variant="text" color="blue-grey">
                  <ArrowLeftIcon className="h-5" />
                </Button>
              </Link>
            </div>
            <Button
              color="cyan"
              size="sm"
              className="flex space-x-2 items-center justify-center"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="dark"
              onClick={(e) => {
                setDialog(true);
                setAction("add");
                setJudul("");
              }}
            >
              <PlusCircleIcon className="h-6" />
              <Typography variant="small">add section</Typography>
            </Button>
          </div>
          <div className="mt-5">
            {loading ? (
              <div className="flex justify-center items-center">
                <RefreshIcon className="h-7 stroke-teal-400 animate-spin" />
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
                    <Lesson getBab={getBab} bab={item.bab} />
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </CardBody>
      </Card>
      <Dialog open={dialog} handler={() => setDialog(false)}>
        <DialogHeader>Add Section</DialogHeader>
        <DialogBody divider>
          <Input
            variant="outlined"
            label="judul"
            value={judul}
            onInput={(e) => setJudul(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              setDialog(false);
            }}
            ripple="dark"
          >
            Close
          </Button>
          <Button
            color="green"
            type="submit"
            ripple="light"
            disabled={btn}
            onClick={saveBab}
          >
            {btn ? (
              <RefreshIcon className="h-5 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Bab;
