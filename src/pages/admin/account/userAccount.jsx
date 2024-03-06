import { Select, useToast } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  PencilAltIcon,
  PlusCircleIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import { UserGroupIcon } from "@heroicons/react/solid";
import {
  Button,
  Card,
  CardBody,
  Input,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Paragraph,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { act } from "react-dom/test-utils";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import {
  urlAccess,
  urlCreateAccess,
  urlDeleteAccess,
  urlDeleteUser,
  urlKursus,
  urlRegister,
  urlRegisterAdmin,
  urlUser,
} from "../../../url";

const UserAccount = () => {
  const [user, setUser] = React.useState();
  const [name, setName] = React.useState();
  const [access, setAccess] = React.useState([]);
  const [id, setId] = React.useState();
  const [courseid, setCourseid] = React.useState();
  const [course, setCourse] = React.useState([]);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [btn, setBtn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [cpassword, setCpassword] = React.useState();
  const [action, setAction] = React.useState();
  const [dialog, setDialog] = React.useState();
  let toast = useToast();

  const column = [
    {
      name: "Nama",
      selector: (row) => row["name"],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex">
          <Button
            color="teal"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => accessHandle(e, row["id"], row["email"])}
          >
            <CheckCircleIcon className="h-8" />
          </Button>
          <Button
            color="pink"
            variant="text"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => deleteHandle(e, row["id"])}
          >
            <TrashIcon className="h-8" />
          </Button>
        </div>
      ),
    },
  ];

  const getUser = async () => {
    setLoad(true);
    await axios.get(urlUser).then(function (response) {
      const data = response;
      setUser(data.data.data);
      setLoad(false);
    });
  };

  const getCourse = async () => {
    await axios.get(urlKursus).then(function (response) {
      const data = response;
      setCourse(data.data.data);
      setCourseid(data.data.data[0].id);
    });
  };

  const courseAccess = async (email) => {
    setLoading(true);
    await axios
      .post(urlAccess, {
        email: email,
      })
      .then(function (response) {
        const data = response;
        setAccess(data.data.data);
        setLoading(false);
      });
  };

  const deleteHandle = (e, id) => {
    setDialog(true);
    setId(id);
    setAction("delete");
  };

  const accessHandle = (e, id, email) => {
    setEmail(email);
    courseAccess(email);
    setDialog(true);
    setId(id);
    setAction("access");
  };

  const addAccess = async () => {
    setBtn(true);
    await axios
      .post(urlCreateAccess, {
        user_id: id,
        kursus_id: courseid,
      })
      .then(function (response) {
        setBtn(false);
        courseAccess(email);
      })
      .catch((e) => {
        setBtn(false);
      });
  };

  const deleteAccess = async (idKursus) => {
    setBtn(true);
    await axios
      .post(urlDeleteAccess + `/${id}/${idKursus}`)
      .then(function (response) {
        courseAccess(email);
        setBtn(false);
      })
      .catch((e) => {
        setBtn(false);
      });
  };

  const deleteUser = async (i) => {
    setBtn(true);
    await axios
      .post(urlDeleteUser + `/${i}`)
      .then(function (response) {
        toast({
          title: "Account deleted.",
          description: "We've deleted the account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getUser();
        setDialog(false);
        setBtn(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
        setDialog(false);
      });
  };

  const addUser = async (e) => {
    e.preventDefault();
    setBtn(true);
    await axios
      .post(urlRegister, {
        name: name,
        email: email,
        password: password,
        password_confirmation: cpassword,
        gambar:
          "https://res.cloudinary.com/dfkoknpii/image/upload/v1646532385/lastproject/account_jzb2mv.png",
      })
      .then(function (response) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getUser();
        setDialog(false);
        setBtn(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setDialog(false);
        setBtn(false);
      });
  };

  const openModal = (itu) => {
    setDialog(true);
    setName("");
    setPassword("");
    setCpassword("");
    setEmail("");
    setAction(itu);
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    setBtn(true);
    await axios
      .post(urlRegisterAdmin, {
        name: name,
        email: email,
        password: password,
        password_confirmation: cpassword,
        gambar:
          "https://res.cloudinary.com/dfkoknpii/image/upload/v1646532385/lastproject/account_jzb2mv.png",
      })
      .then(function (response) {
        toast({
          title: "Account created.",
          description: "We've created the account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
        getUser();
        setDialog(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
        setDialog(false);
      });
  };
  console.log(courseid);

  useEffect(() => {
    getUser();
    getCourse();
  }, []);
  return (
    <div>
      <Card className="mt-6">
        <CardBody>
          {load ? (
            <div className="flex justify-center">
              <RefreshIcon className="h-7 stroke-cyan-700 animate-spin" />
            </div>
          ) : (
            <DataTable
              title={
                <div className="flex justify-end py-3 mb-6">
                  <div className="flex">
                    <Button
                      className="mr-3 flex items-center space-x-2"
                      color="cyan"
                      size="md"
                      variant="gradient"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="dark"
                      onClick={(e) => {
                        openModal("user");
                      }}
                    >
                      <PlusCircleIcon className="h-6" />
                      <Typography variant="small">Add user</Typography>
                    </Button>
                    <Button
                      variant="gradient"
                      className="mr-3 flex items-center space-x-2"
                      color="cyan"
                      size="md"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="dark"
                      onClick={(e) => {
                        openModal("admin");
                      }}
                    >
                      <PlusCircleIcon className="h-6" />
                      <Typography variant="small">Add admin</Typography>
                    </Button>
                  </div>
                </div>
              }
              columns={column}
              data={user}
              pagination={""}
              subHeader={""}
              selectableRows={""}
              persistTableHead
              dense
            />
          )}
        </CardBody>
      </Card>
      <Dialog size="md" open={dialog} handler={() => setDialog(false)}>
        <DialogHeader>
          {action === "admin"
            ? "Add Admin"
            : action === "user"
            ? "Add User"
            : action === "access"
            ? "Course Access"
            : "Delete Account"}
        </DialogHeader>
        {action === "delete" ? (
          <div>
            <DialogBody divider>
              <div className="py-6 mx-auto">
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
                variant="gradient"
                onClick={(e) => deleteUser(id)}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        ) : action === "access" ? (
          <div>
            <DialogBody divider className="flex-col">
              <div className="flex justify-between space-x-2 items-center">
                <div className="flex-nowrap flex space-x-2 items-center">
                  <p className="text-lg">Tambah akses:</p>
                  <Select
                    color="teal"
                    label="select class"
                    value={courseid}
                    onChange={(e) => setCourseid(e.target.value)}
                  >
                    {course.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.judul}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button
                  disabled={btn}
                  variant="gradient"
                  color="teal"
                  onClick={addAccess}
                >
                  {btn ? (
                    <RefreshIcon className="h-5 animate-spin" />
                  ) : (
                    "tambah"
                  )}
                </Button>
              </div>
              <div>
                {access === undefined ? (
                  <div></div>
                ) : (
                  <div>
                    {loading ? (
                      <div className="flex items-center justify-center mt-4">
                        <RefreshIcon className="h-7 stroke-teal-400 animate-spin" />
                      </div>
                    ) : (
                      <div>
                        {access.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg bg-cyan-500 text-white py-4 px-2 mt-3"
                          >
                            <p className="font-semibold">
                              {item.kursus[0].judul}
                            </p>
                            <Button
                              color="pink"
                              disabled={btn}
                              variant="gradient"
                              onClick={(e) => deleteAccess(item.kursus[0].id)}
                            >
                              <TrashIcon className="h-6" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </DialogBody>
          </div>
        ) : (
          <div>
            <DialogBody divider className="flex-col">
              <div>
                <Input
                  variant="outlined"
                  label="name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  variant="outlined"
                  label="email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  variant="outlined"
                  label="password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  variant="outlined"
                  label="password confirmation"
                  value={cpassword}
                  onInput={(e) => setCpassword(e.target.value)}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <div>
                <Button
                  color="red"
                  variant="text"
                  onClick={(e) => setDialog(false)}
                  ripple="dark"
                >
                  Close
                </Button>
              </div>

              <Button
                color="green"
                type="submit"
                disabled={btn}
                variant="gradient"
                onClick={action === "admin" ? addAdmin : addUser}
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
export default UserAccount;
