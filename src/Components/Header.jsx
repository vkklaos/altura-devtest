import WalletButton from "../Components/WalletButton";
import React from "react";
import { createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 1080,
    padding: 10,
  },
}));

const Header = () => {
  const { classes } = useStyles();

  return (
      <div className={classes.header}>
        <WalletButton />
      </div>
  );
};

export default Header;
