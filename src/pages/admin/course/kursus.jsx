import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  urlDeleteKursus,
  urlKursus,
  urlSaveKursus,
  urlUpdateKursus,
} from "../../../url";
import DataTable from "react-data-table-component";
import {
  PencilAltIcon,
  PhotographIcon,
  PlusCircleIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";

const Kursus = () => {
  const [kursus, setKursus] = React.useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [action, setAction] = React.useState();
  const [judul, setJudul] = React.useState();
  const [desc, setDesc] = React.useState();
  const [pict, setPict] = React.useState();
  const [img, setImg] = React.useState();
  const [btn, setBtn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState();
  let editorState = EditorState.createEmpty();
  const [state, setState] = React.useState(editorState);
  let formData = new FormData();
  let toast = useToast();
  let nav = useNavigate();
  const column = [
    {
      name: "Nama",
      selector: (row) => row["judul"],
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row["deskripsi"] }} />
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-between">
          <Button
            color="teal"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              editKursus(e, row);
            }}
          >
            <PencilAltIcon className="h-8" />
          </Button>
          <Button
            color="pink"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              deleteHandle(e, row["id"]);
            }}
          >
            <TrashIcon className="h-8" />
          </Button>
          <Button
            color="cyan"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              nav("/admin/bab", { state: { id: row["id"] } });
            }}
          >
            <PlusCircleIcon className="h-8" />
          </Button>
          <Button
            color="grey"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              imgHandle(e, row["gambar"]);
            }}
          >
            <PhotographIcon className="h-8" />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  const deleteHandle = (e, id) => {
    setDialog(true);
    setId(id);
    setAction("delete");
  };

  const imgHandle = (e, img) => {
    setDialog(true);
    setAction("img");
    setImg(img);
  };

  const descChange = (e) => {
    setState(e);
  };

  const getKursus = async () => {
    setLoading(true);
    await axios
      .get(urlKursus, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        const data = response;
        setKursus(data.data.data);
        setLoading(false);
      });
  };
  console.log(kursus);

  const addKursus = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("gambar", pict);
    formData.append("judul", judul);
    formData.append("deskripsi", desc.value);
    await axios
      .post(urlSaveKursus, formData)
      .then(function (response) {
        getKursus();
        setDialog(false);
        setBtn(false);
        toast({
          title: "Course created.",
          description: "We've created a course for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false);
        if (message === "Call to a member function getRealPath() on null") {
          toast({
            description: "please insert an image",
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            description: message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const updateKursus = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("gambar", pict);
    formData.append("judul", judul);
    formData.append("deskripsi", desc.value);
    formData.append("id", id);
    await axios
      .post(urlUpdateKursus, formData)
      .then(function (response) {
        getKursus();
        setBtn(false);
        setDialog(false);
        setState(editorState);
        toast({
          title: "Course updated.",
          description: "We've change the course for you.",
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

  const editKursus = (e, row) => {
    setJudul(row.judul);
    setAction("edit");
    setId(row.id);
    setPict(row.gambar);
    setDesc(row.deskripsi);
    setDialog(true);
  };

  const deleteKursus = async (i) => {
    setBtn(true);
    await axios
      .post(urlDeleteKursus + `/${i}`)
      .then(function (response) {
        getKursus();
        setDialog(false);
        setBtn(false);
        toast({
          title: "Course deleted.",
          description: "We've deleted the course for you.",
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

  const closeDialog = () => {
    setDialog(false);
    setJudul("");
    setState(editorState);
  };

  useEffect(() => {
    getKursus();
  }, []);
  return (
    <div>
      <Card className="mt-6">
        <CardBody>
          {loading ? (
            <div className="flex justify-center">
              <RefreshIcon className="h-7 stroke-cyan-700 animate-spin" />
            </div>
          ) : (
            <DataTable
              title={
                <div className="flex justify-end py-3 mb-6">
                  <Button
                    className="flex space-x-2 items-center justify-center"
                    color="cyan"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    onClick={(e) => {
                      setDialog(true);
                      setJudul("");
                      setPict(null);
                      setState(editorState);
                      setAction("add");
                    }}
                  >
                    <PlusCircleIcon className="h-6" />
                    <Typography variant="small">add course</Typography>
                  </Button>
                </div>
              }
              columns={column}
              data={kursus}
              pagination={""}
              subHeader={""}
              selectableRows={""}
              persistTableHead
              dense
            />
          )}
        </CardBody>
      </Card>
      <Dialog
        className="max-h-screen"
        size="md"
        open={dialog}
        handler={() => setDialog(false)}
      >
        <DialogHeader>
          {action === "add"
            ? "Add Course"
            : action === "edit"
            ? "Edit Course"
            : action === "img"
            ? "Course Image"
            : "Delete Course"}
        </DialogHeader>
        {action === "delete" ? (
          <div>
            <DialogBody divider>
              <div className="py-6">
                <p className="text-center text-xl text-red-600 font-semibold">
                  Are You Sure?
                </p>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                color="red"
                variant="text"
                onClick={(e) => setDialog(false)}
                ripple="dark"
              >
                Close
              </Button>

              <Button
                color="green"
                ripple="light"
                disabled={btn}
                onClick={(e) => deleteKursus(id)}
              >
                {btn ? (
                  <RefreshIcon className="h-5 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : action === "img" ? (
          <div>
            <DialogBody divider>
              <div className="py-6">
                <img src={img} alt="" />
              </div>
            </DialogBody>
          </div>
        ) : (
          <div>
            <DialogBody divider className="flex-col">
              <div>
                <Input
                  label="judul"
                  value={judul}
                  onInput={(e) => setJudul(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => setPict(e.target.files[0])}
                />
              </div>
              <div className="mt-4 border h-full p-3 rounded-lg">
                <Editor
                  label="deskripsi"
                  editorState={state}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={descChange}
                />
                <textarea
                  className="hidden"
                  disabled
                  ref={(e) => setDesc(e)}
                  value={draftjsToHtml(convertToRaw(state.getCurrentContent()))}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                color="red"
                variant="text"
                onClick={(e) => {
                  e.preventDefault();
                  closeDialog();
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
                onClick={action === "add" ? addKursus : updateKursus}
              >
                {btn ? (
                  <RefreshIcon className="h-5 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default Kursus;
