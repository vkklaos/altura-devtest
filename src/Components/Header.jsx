import WalletButton from "../Components/WalletButton";
import React from "react";
import { createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    maxWidth: 1080,
    padding: 15,
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
