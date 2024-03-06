import logo from "./logo.svg";
import "./App.css";
import Rute from "./Routes";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <ChakraProvider>
          <Rute />
        </ChakraProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
