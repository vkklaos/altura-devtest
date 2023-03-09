import { createStyles } from "@mantine/core";
import React from "react";
import { WalletSearch } from "../Components/WalletSearch";
import Header from "../Components/Header";
import NftsFrame from "../Components/NftsFrame";


const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
  },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div>
        <WalletSearch />
        <NftsFrame />
      </div>
    </div>
  );
};

export default Home;
