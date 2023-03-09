import { Center, createStyles, Loader, ScrollArea, SimpleGrid } from "@mantine/core";
import React from "react";
import { AppContext } from "../Context";
import NftCard from "./NftCard";


const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
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
  const { nfts, isLoading, user } = React.useContext(AppContext);

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (nfts.length !== 0) {
      const uris = nfts.map((nft) => {
        return nft.uri
      });
      Promise.all(
          uris.filter((uri) => uri.startsWith("http")).map(async (uri) => {
              let res = await fetch(uri);
              let json = await res.json();
              json.uri = uri;
              return json;
          })
      ).then((json) => {
          setItems(json);
      }).catch((err) => {
          console.log(err);
          setItems([]);
      })
    }
  }, [nfts])

  return (
    <div className={classes.root}>
      <ScrollArea h="65vh" style={{paddingRight: 50}} w="100%">
          {isLoading &&
            <Center>
              <Loader variant="dots" color="dark" />
            </Center>
          }
          {!isLoading && user !== "" &&
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'md', cols: 3, spacing: 'md' },
                { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                { maxWidth: 'xs', cols: 1, spacing: 'sm' },
              ]}
            >
              {items && items.map((nft, index) => (
                <NftCard key={index} item={nft} />
              ))}
            </SimpleGrid>
          }
          
      </ScrollArea>
    </div>
  );
};

export default NftsFrame;
