import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { RefreshIcon } from "@heroicons/react/outline";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { values } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlJawaban, urlNilaiJawaban, urlUpdateJawaban } from "../../../url";

const Task = () => {
  const [task, setTask] = React.useState([]);
  const [komen, setKomen] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [dialog, setDialog] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState();
  const [img, setImg] = React.useState();
  const [jawaban, setJawaban] = React.useState({});
  let { state } = useLocation();
  let { id, idKursus, idBab } = state;
  let toast = useToast();
  const getJawaban = async () => {
    setLoading(true);
    await axios
      .get(urlJawaban + `/${idKursus}/${idBab}/${id}`)
      .then(function (response) {
        const data = response;
        setTask(data.data.data);
        setLoading(false);
      });
  };

  const evaluation = async (idJawaban, nama, email, gambar) => {
    setBtn(true);
    await axios
      .post(urlUpdateJawaban, {
        id: idJawaban,
        idKursus: idKursus,
        idMateri: id,
        idBab: idBab,
        nilai: value,
        komen: komen,
        gambar: gambar,
        namauser: nama,
        email: email,
      })
      .then(function (response) {
        getJawaban();
        setBtn(false);
        toast({
          title: "Value given",
          description: "We've set the value",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setDialog(false);
      });
  };

  useEffect(() => {
    getJawaban();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <RefreshIcon className="h-7 stroke-cyan-700 animate-spin" />
        </div>
      ) : (
        <div>
          {task.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-cyan-800 text-lg">
                Belum ada yang mengerjakan soal
              </p>
            </div>
          ) : (
            <div className="grid gap-3 grid-cols-3">
              {task.map((item, i) => (
                <div key={i} className="shadow-lg rounded-md">
                  <div className="rounded-t-md flex justify-between p-2 bg-cyan-900 text-white">
                    <h2>{item.namauser}</h2>
                    <h2>{item.email}</h2>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      setAction("img");
                      setImg(item.gambar);
                      setDialog(true);
                    }}
                  >
                    <img src={item.gambar} alt="" className="aspect-video" />
                  </div>

                  {parseInt(item.nilai) > 0 ? (
                    <div>
                      <div className="p-3 bg-cyan-600 text-white">
                        <h2>{item.komen}</h2>
                      </div>
                      <div className="flex justify-between items-center pl-4">
                        <h2
                          className={`${
                            parseInt(item.nilai) >= 75
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.nilai}
                        </h2>
                        <Button
                          onClick={(e) => {
                            setValue(item.nilai);
                            setJawaban(item);
                            setKomen(item.komen);
                            setAction("edit");
                            setDialog(true);
                          }}
                        >
                          edit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Textarea
                        className="resize-none"
                        placeholder="write a comment.."
                        value={komen}
                        onInput={(e) => setKomen(e.target.value)}
                      />
                      <InputGroup>
                        <Input
                          value={value}
                          onInput={(e) => setValue(e.target.value)}
                          variant="filled"
                          placeholder={"give value.."}
                          type="number"
                        />
                        <InputRightAddon
                          children={
                            <Button
                              disabled={btn}
                              onClick={(e) =>
                                evaluation(
                                  item.id,
                                  item.namauser,
                                  item.email,
                                  item.gambar
                                )
                              }
                            >
                              {btn ? (
                                <RefreshIcon className="h-5 animate-spin" />
                              ) : (
                                "send"
                              )}
                            </Button>
                          }
                        />
                      </InputGroup>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Dialog open={dialog} handler={() => setDialog(false)}>
        <DialogHeader>
          {action === "edit" ? "Edit value" : "Task Image"}
        </DialogHeader>
        {action === "edit" ? (
          <div>
            <DialogBody className="flex-col">
              <Textarea
                className="resize-none"
                value={komen}
                onInput={(e) => setKomen(e.target.value)}
              />
              <div className="mt-4">
                <Input
                  type="number"
                  value={value}
                  onInput={(e) => setValue(e.target.value)}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                color="red"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setDialog(false);
                }}
                ripple="dark"
              >
                Close
              </Button>
              <Button
                variant="solid"
                colorScheme="teal"
                disabled={btn}
                onClick={(e) =>
                  evaluation(
                    jawaban.id,
                    jawaban.namauser,
                    jawaban.email,
                    jawaban.gambar
                  )
                }
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
        ) : (
          <DialogBody>
            <div className="py-2">
              <img src={img} alt="" />
            </div>
          </DialogBody>
        )}
      </Dialog>
    </div>
  );
};

export default Task;
