import React, { useEffect } from "react";
import Section from "./section";
import Sidebar from "./sidebar";

const Materi = () => {
  const [length, setLength] = React.useState()
  const [lesson, setLesson] = React.useState({})
  const [i, setI] = React.useState()
  const [check, setCheck] = React.useState({})
  
  useEffect(() => {
    
  }, [])
  
  return (
    <div>
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-1">
          <Sidebar setLength={setLength} setL={setLesson} setI={setI} setCheck={setCheck}/>
        </div>
        <div className="col-span-3 py-5 px-8">
          <Section length={length} lesn={lesson} setLesson={setLesson} setCheck={setCheck} i={i} check={check}/>
        </div>
      </div>
    </div>
  );
};
export default Materi;
