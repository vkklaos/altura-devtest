import { createStyles, Image, ScrollArea, SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";
import { AppContext } from "../Context";


const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 940,
    backgroundColor: "#EADDD6",
    border: '1px solid #E3CEC2',
    borderRadius: 9,
    boxShadow: "0px 6px 6px -4px rgba(0, 0, 0, 0.25)",
    paddingLeft: 60,
    paddingRight: 10,
    paddingTop: 30,
    paddingBottom: 60,
  },
}));

const NftsFrame = () => {
  const { classes } = useStyles();
  const { nfts, isLoading } = React.useContext(AppContext);

  return (
    <div className={classes.root}>
      <ScrollArea h="65vh" style={{paddingRight: 50}} w="100%">
        <Skeleton visible={isLoading}>
          <SimpleGrid spacing={30} cols={4}>
            {nfts && nfts.map((nft, index) => (
              <Image key={index} src={nft.image} w={32} />
            ))}
          </SimpleGrid>
        </Skeleton>
      </ScrollArea>
    </div>
  );
};

export default NftsFrame;
