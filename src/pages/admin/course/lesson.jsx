import { AccordionPanel, useToast, Select } from "@chakra-ui/react";
import {
  DotsVerticalIcon,
  PencilIcon,
  PlusCircleIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Menu,
  Chip,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import {
  urlDeleteBab,
  urlDeleteMateri,
  urlMateri,
  urlSaveMateri,
  urlUpdateBab,
  urlUpdateMateri,
} from "../../../url";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";

const Lesson = ({ bab, getBab }) => {
  const [judul, setJudul] = React.useState();
  const [isi, setIsi] = React.useState();
  const [tipe, setTipe] = React.useState(1);
  const [id, setId] = React.useState();
  const [dialog, setDialog] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [action, setAction] = React.useState();
  let editorState = EditorState.createEmpty();
  const [editor, setEditor] = React.useState(editorState);
  let toast = useToast();

  const isiChange = (e) => {
    setEditor(e);
  };

  const closeDialog = () => {
    setDialog(false);
    setJudul("");
    setEditor(editorState);
  };

  const saveLesson = async () => {
    setBtn(true);
    await axios
      .post(urlSaveMateri, {
        judul: judul,
        idKursus: bab.kursus_id,
        idBab: bab.id,
        isi: isi.value,
        tipe: tipe,
      })
      .then(function (response) {
        getBab();
        setBtn(false);
        setDialog(false);
        toast({
          title: "Lesson created.",
          description: "We've created a lesson in this section",
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

  const updateLesson = async () => {
    setBtn(true);
    await axios
      .post(urlUpdateMateri, {
        judul: judul,
        idKursus: bab.kursus_id,
        idBab: bab.id,
        id: id,
        isi: isi.value,
        tipe: tipe,
      })
      .then(function (response) {
        getBab();
        setDialog(false);
        setBtn(false);
        toast({
          title: "Lesson updated.",
          description: "We've change the lesson for you.",
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

  const updateBab = async (id, idk) => {
    setBtn(true);
    await axios
      .post(urlUpdateBab, {
        judul: judul,
        id: bab.id,
        idKursus: bab.kursus_id,
      })
      .then(function (response) {
        setBtn(false);
        toast({
          title: "Section updated.",
          description: "We've change the section for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getBab();
        setDialog(false);
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

  const deleteLesson = async () => {
    setBtn(true);
    await axios
      .post(urlDeleteMateri + `/${id}`)
      .then(function (response) {
        getBab();
        setDialog(false);
        setBtn(false);
        toast({
          title: "Lesson deleted.",
          description: "We've deleted the lesson for you.",
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

  const deleteBab = async () => {
    setBtn(true);
    await axios
      .post(urlDeleteBab + `/${bab.id}`)
      .then(function (response) {
        getBab();
        setDialog(false);
        setBtn(false);
        toast({
          title: "Section deleted.",
          description: "We've deleted a section here.",
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

  useEffect(() => {}, []);

  return (
    <div>
      {bab.materi.map((item, i) => (
        <AccordionPanel
          pb={4}
          key={i}
          className="hover:bg-grey-100 transform duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center">
              <p>{item.judul}</p>
              {item.tipe === 1 ? (
                <Chip color="cyan" value="materi" />
              ) : (
                <Chip color="teal" value="soal" />
              )}
            </div>
            <Menu>
              <MenuHandler>
                <Button variant="text" color="grey">
                  <DotsVerticalIcon className="h-6" />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  color="teal"
                  ripple="light"
                  onClick={(e) => {
                    e.preventDefault();
                    setAction("edit");
                    setJudul(item.judul);
                    setTipe(item.tipe);
                    setEditor(editorState);
                    setId(item.id);
                    setDialog(true);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <PencilIcon className="h-6" />
                    <p>Edit</p>
                  </div>
                </MenuItem>
                <MenuItem
                  color="pink"
                  ripple="light"
                  onClick={(e) => {
                    e.preventDefault();
                    setAction("delete");
                    setId(item.id);
                    setDialog(true);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <TrashIcon className="h-6" />
                    <p>Delete</p>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </AccordionPanel>
      ))}
      <AccordionPanel>
        <div className="flex space-x-3 justify-center">
          <Button
            className="flex items-center space-x-2"
            color="cyan"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={(e) => {
              setDialog(true);
              setAction("add");
              setJudul("");
              setEditor(editorState);
            }}
          >
            <PlusCircleIcon className="h-6" />
            <Typography variant="small">Tambah</Typography>
          </Button>
          <Button
            className="flex items-center space-x-2"
            color="teal"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={(e) => {
              setDialog(true);
              setJudul(bab.judul);
              setAction("editS");
            }}
          >
            <PencilIcon className="h-6" />
            <Typography variant="small">edit section</Typography>
          </Button>
          <Button
            className="flex items-center space-x-2"
            color="pink"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={(e) => {
              setDialog(true);
              setAction("deleteS");
            }}
          >
            <TrashIcon className="h-6" />
            <Typography variant="small">delete section</Typography>
          </Button>
        </div>
      </AccordionPanel>
      <Dialog size="regular" open={dialog} toggler={() => setDialog(false)}>
        <DialogHeader>
          {action === "add"
            ? "Add"
            : action === "edit" || action === "editS"
            ? "Edit"
            : "Delete"}
        </DialogHeader>
        {action === "delete" || action === "deleteS" ? (
          <div>
            <DialogBody divider>
              <div className="py-6">
                <p className="text-center text-xl text-red-600 font-semibold">
                  Delete this {action === "delete" ? "lesson" : "section"}?
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
                onClick={(e) => {
                  e.preventDefault();
                  if (action === "deleteS") {
                    deleteBab();
                  } else {
                    deleteLesson();
                  }
                }}
              >
                {btn ? (
                  <RefreshIcon className="h-5 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : action === "editS" ? (
          <div>
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
                onClick={updateBab}
              >
                {btn ? (
                  <RefreshIcon className="h-5 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div>
            <DialogBody divider className="flex-col">
              <div className="flex justify-between space-x-5">
                <Input
                  variant="outlined"
                  label="judul"
                  value={judul}
                  onInput={(e) => setJudul(e.target.value)}
                />
                <Select value={tipe} onChange={(e) => setTipe(e.target.value)}>
                  <option value={1}>Materi</option>
                  <option value={2}>Soal</option>
                </Select>
              </div>
              <div className="mt-4 border h-full p-3 rounded-lg">
                <Editor
                  variant="outlined"
                  label="write something...."
                  editorState={editor}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={isiChange}
                />
                <textarea
                  className="hidden"
                  disabled
                  ref={(e) => setIsi(e)}
                  value={draftjsToHtml(
                    convertToRaw(editor.getCurrentContent())
                  )}
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
                disabled={btn}
                onClick={(e) => {
                  e.preventDefault();
                  if (action === "edit") {
                    updateLesson();
                  } else {
                    saveLesson();
                  }
                }}
                ripple="light"
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

export default Lesson;
