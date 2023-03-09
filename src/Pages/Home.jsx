import React from "react";
import { createStyles, Loader } from "@mantine/core";
import { AppContext } from "../Context";
import Header from "../Components/Header";
import NftsFrame from "../Components/NftsFrame";
import { WalletSearch } from "../Components/WalletSearch";


const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
  }
}));

const Home = () => {
  const { classes } = useStyles();
  const { isLoading, user } = React.useContext(AppContext);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.wrapper}>
        <WalletSearch />
        {!isLoading && user !== "" &&
          <NftsFrame />
        }
        {isLoading &&
          <Loader variant="dots" color="dark" />
        }
      </div>
    </div>
  );
};

export default Home;
