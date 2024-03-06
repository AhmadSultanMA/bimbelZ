import { AccordionButton, AccordionPanel } from "@chakra-ui/react";
import axios from "axios";
import { get } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useEffect } from "react";
import { urlJawaban, urlMateri } from "../../../url";

const Lesson = ({ setCheck,bab1, setTes, setL, bab, setLength, setI }) => {
  const [lesson, setLesson] = React.useState([]);
  const [jawaban, setJawaban] = React.useState()
  
  // const getLesson = async () => {
  //   await axios
  //     .get(urlMateri + `/${idKursus}/${idBab}`)
  //     .then(function (response) {
  //       const data = response;
  //       setLesson(data.data.data);
  //       setLength(data.data.data.length);
  //     })
  //     .catch();
  // };

  const checkTask = async (id) => {
    await axios.get(
      urlJawaban + `/${id}/${localStorage.getItem("email")}`
    ).then(function (response) {
      const data = response
      setCheck(data.data.data)
    }).catch()
  };

  // const checkAccess = async()=>{
  //   if
  // }

  const getIsi = async (id) => {
    await axios
      .get(urlMateri + `/${id}`)
      .then(function (response) {
        const data = response;
        setL(data.data.data);
      })
      .catch();
  };

  useEffect(() => {
    setL(bab1.materi[0])
  }, []);

  return (
    <div>
      {bab.materi.map((item, i) => (
        <AccordionPanel
          pb={4}
          key={i}
          className="cursor-pointer hover:bg-grey-100 transform duration-300"
          onClick={(e) => {
            checkTask(item.id)
            setI(i);
            setL(item)
          }}
        >
          {item.judul}
        </AccordionPanel>
      ))}
    </div>
  );
};

export default Lesson;
