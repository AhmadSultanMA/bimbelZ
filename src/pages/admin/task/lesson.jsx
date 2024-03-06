import { AccordionButton, AccordionPanel } from "@chakra-ui/react";
import axios from "axios";
import { get } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlJawaban, urlMateri } from "../../../url";

const Lesson = ({ materi }) => {
  const [lesson, setLesson] = React.useState([]);
  let nav = useNavigate();
  // const getLesson = async () => {
  //   await axios
  //     .get(urlMateri + `/${idKursus}/${idBab}`)
  //     .then(function (response) {
  //       const data = response;
  //       setLesson(data.data.data);
  //     })
  //     .catch();
  // };

  useEffect(() => {

  }, []);

  return (
    <div>
      {materi.map((item, i) => (
        <div key={i}>
          {item.tipe === 2 ? (
            <AccordionPanel
              pb={4}
              className="cursor-pointer hover:bg-grey-100 transform duration-300"
              onClick={(e) => {
                nav("/admin/evaluation", {
                  state: {
                    id: item.id,
                    idBab: item.bab_id,
                    idKursus: item.kursus_id,
                  },
                });
              }}
            >
              {item.judul}
            </AccordionPanel>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Lesson;
