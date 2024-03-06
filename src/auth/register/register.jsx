import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { EyeIcon, EyeOffIcon, RefreshIcon } from "@heroicons/react/outline";
import { urlLogin, urlProgress, urlRegister } from "../../url";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  let nav = useNavigate();
  let toast = useToast();
  const [email, setEmail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [cpassword, setCpassword] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleShow = () => {
    setShowPassword(showPassword ? false : true);
  };
  const register = async (e) => {
    e.preventDefault();
    setLoading(true)
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
        nav("/login", { replace: true });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setLoading(false)
        toast({
          description: message,
          status: "error",
          duration: 9000,
          position: "top",
          variant: "solid",
          isClosable: true,
        });
      });
  };
  return (
    <div>
      <div>
        <div className="bg-login bg-cover bg-center h-screen w-screen relative flex ">
          <nav className="px-2 sm:px-4 py-2.5 rounded h-1/6 w-full fixed">
            <div className="container flex flex-wrap justify-between items-center">
              <a href="#" className="">
                <img src={logo} alt="" className="h-20" />
              </a>
            </div>
          </nav>
          <div className="flex h-screen items-center w-screen">
            <div className="mx-auto w-1/2">
              <Card size="lg">
                <CardHeader color="cyan" className="py-5">
                  <Typography
                    variant="h5"
                    color="white"
                    className="text-center"
                  >
                    Register
                  </Typography>
                </CardHeader>

                <CardBody size="lg">
                  <form onSubmit={register}>
                    <div className="mt-7 mb-8 px-4">
                      <Input
                        type="text"
                        color="cyan"
                        variant="outlined"
                        label="Name"
                        value={name}
                        onInput={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-8 px-4">
                      <Input
                        type="text"
                        color="cyan"
                        variant="outlined"
                        label="Email"
                        value={email}
                        onInput={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-8 px-4 relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        color="cyan"
                        variant="outlined"
                        label="Password"
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                      />
                      <div onClick={toggleShow} className="cursor-pointer">
                        {showPassword ? (
                          <EyeOffIcon className="absolute h-1/2 top-3 right-5 text-grey-400" />
                        ) : (
                          <EyeIcon className="absolute h-1/2 top-3 right-5 text-grey-400" />
                        )}
                      </div>
                    </div>
                    <div className="mb-4 px-4 relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        color="cyan"
                        variant="outlined"
                        label="Password confirmation"
                        value={cpassword}
                        onInput={(e) => setCpassword(e.target.value)}
                      />
                      <div onClick={toggleShow} className="cursor-pointer">
                        {showPassword ? (
                          <EyeOffIcon className="absolute h-1/2 top-3 right-5 text-grey-400" />
                        ) : (
                          <EyeIcon className="absolute h-1/2 top-3 right-5 text-grey-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center mb-5">
                      <Button
                        type="submit"
                        color="cyan"
                        buttonType="filled"
                        ripple="light"
                      >
                        {loading ? (
                          <RefreshIcon className="animate-spin h-5" />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <Link to="/login">
                    <p className="text-center text-cyan-600 text-xs">
                      Already have account?
                    </p>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
