import { RefreshIcon } from "@heroicons/react/outline";
import { BookOpenIcon, UserGroupIcon } from "@heroicons/react/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardStatus,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { urlKursus, urlUser } from "../../../url";

const Data = () => {
  const [user, setUser] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getUser = async () => {
    setLoading(true);
    await axios.get(urlUser).then(function (response) {
      const data = response;
      setUser(data.data.data);
      setLoading(false);
    });
  };
  const getCourse = async () => {
    setLoading(true);

    await axios.get(urlKursus).then(function (response) {
      const data = response;
      setLoading(false);
      setCourse(data.data.data);
    });
  };

  useEffect(() => {
    getUser();
    getCourse();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center"><RefreshIcon className="stroke-cyan-700 animate-spin h-16"/></div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          <Card className="mt-7 w-full" variant="filled">
            <CardHeader
              className="w-1/4 flex items-center justify-center p-5"
              color="light-blue"
              size="xs"
              iconOnly
            >
              <UserGroupIcon className="w-16" />
            </CardHeader>
            <CardBody>Users</CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-3"
            >
              <Typography variant="small">{user.length}</Typography>
            </CardFooter>
          </Card>
          <Card className="mt-7 w-96">
            <CardHeader
              className="w-1/4 flex items-center justify-center p-5"
              color="light-green"
              size="xs"
              iconOnly
            >
              <BookOpenIcon className="w-16" />
            </CardHeader>
            <CardBody>Courses</CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-3"
            >
              <Typography variant="small">{course.length}</Typography>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Data;
