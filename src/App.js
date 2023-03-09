import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { AppStorage } from "./Context";

const App = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Prompt, sans-serif",
        white: "#F2ECE9",
        black: "#3E271B",
        primaryColor: "dark",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <AppStorage>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppStorage>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
