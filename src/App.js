import React from "react";
import { MantineProvider } from "@mantine/core";
import Home from "./Pages/Home";
import { AppStorage } from "./Context";

const App = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Prompt, sans-serif",
        white: "#F2ECE9",
        black: "#3E271B",
        colors: {
          main: [
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
            "#D36327",
          ]
        },
        primaryColor: "main",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppStorage>
        <Home />
      </AppStorage>
    </MantineProvider>
  );
};

export default App;
