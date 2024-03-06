import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlAccess, urlKursus } from "../../../url";

const Kursus = () => {
  let nav = useNavigate();
  const [course, setCourse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getCourse = async () => {
    setLoading(true);
    if (localStorage.getItem("role") === "admin") {
      await axios
        .get(urlKursus)
        .then(function (response) {
          const data = response;
          setCourse(data.data.data);
          setLoading(false);
        })
        .catch();
    } else {
      await axios
        .post(urlAccess, {
          email: localStorage.getItem("email"),
        })
        .then(function (response) {
          const data = response;
          setCourse(data.data.data);
          setLoading(false);
        })
        .catch();
    }
  };

  useState(() => {
    getCourse();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <RefreshIcon className="h-7 stroke-cyan-700 animate-spin" />
        </div>
      ) : (
        <div>
          {course.length === 0 ? (
            <div className="flex items-center space-x-2 justify-center w-1/2 mx-auto mt-5 py-5 text-lg text-white rounded-lg shadow-md bg-gradient-to-r to-purple-700 from-indigo-600">
              <ExclamationCircleIcon className="h-7" />
              {localStorage.getItem("role") === "admin" ? (
                <p>tidak ada kelas tersedia</p>
              ) : (
                <p>anda tidak terdaftar dikelas manapun</p>
              )}
            </div>
          ) : (
            <div>
              {localStorage.getItem("role") === "admin" ? (
                <div className="grid grid-cols-4 mt-8">
                  {course.map((item, i) => (
                    <div className="p-5 col-span-4 md:col-span-2 lg:col-span-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-95">
                      <Card key={i} className=" h-full">
                        <CardHeader>
                          <img
                            src={item.gambar}
                            className="aspect-video"
                            alt="pict"
                          />
                        </CardHeader>
                        <CardBody>
                          <Typography variant="h5">{item.judul}</Typography>
                          <Typography
                            variant="small"
                            dangerouslySetInnerHTML={{ __html: item.deskripsi }}
                          ></Typography>
                        </CardBody>
                        <CardFooter divider>
                          <div className="flex justify-end pb-5">
                            <Button
                              size="sm"
                              className="flex items-center space-x-2"
                              ripple="light"
                              color="cyan"
                              onClick={(e) => {
                                e.preventDefault();
                                nav("/user/lesson", { state: { id: item.id } });
                              }}
                            >
                              <Typography variant="small">learn</Typography>{" "}
                              <ArrowRightIcon className="h-4" />
                            </Button>
                          </div>

                          <Progress variant="gradient" value={50} />
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 mt-8 ">
                  {course.map((item, i) => (
                    <div className=" p-5 col-span-4 md:col-span-2 lg:col-span-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-95 h-full">
                      <Card key={i} className=" h-full">
                        <CardHeader>
                          <img
                            src={item.kursus[0].gambar}
                            className="aspect-video"
                            alt="pict"
                          />
                        </CardHeader>
                        <CardBody className="">
                          <Typography variant="h5">
                            {item.kursus[0].judul}
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: item.kursus[0].deskripsi,
                            }}
                          ></Typography>
                        </CardBody>
                        <CardFooter divider>
                          <div className="flex justify-end pb-5">
                            <Button
                              size="sm"
                              className="flex items-center space-x-2"
                              ripple="light"
                              color="cyan"
                              onClick={(e) => {
                                e.preventDefault();
                                nav("/user/lesson", { state: { id: item.kursus[0].id } });
                              }}
                            >
                              <Typography variant="small">learn</Typography>{" "}
                              <ArrowRightIcon className="h-4" />
                            </Button>
                          </div>

                          <Progress variant="gradient" value={50} />
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Kursus;
