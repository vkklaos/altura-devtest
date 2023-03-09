import React from "react";
import {
  Button,
  CloseButton,
  createStyles,
  Group,
  Image,
  Loader,
  Modal,
  Text,
} from "@mantine/core";
import { AppContext } from "../Context";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.black,
    transition: "color 200ms ease",
    cursor: "pointer",
    ":hover": {
      color: "#D36327",
    },
    gap: 10,
  },
  image: {
    maxWidth: 150,
    borderRadius: 9,
    transition: "box-shadow 200ms ease",
    img: {
      borderRadius: 9,
    },
    boxShadow: "0px 6px 3px -2px rgba(0, 0, 0, 0.25)",
    ":hover": {
      boxShadow: "0px 8px 1px -2px rgba(0, 0, 0, 0.25)",
    },
  },
  loaderWrapper: {
    width: 150,
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    maxWidth: 150,
    fontSize: 16,
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  modalWrapper: {
    width: "100%",
    display: "flex",
    gap: 30,
    [theme.fn.smallerThan('sm')]: {
        gap: 15,
        flexDirection: "column",
      },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    [theme.fn.smallerThan('sm')]: {
        flexDirection: "column-reverse",
      },
    gap: 20,
  },
  right: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  modalImage: {
    maxWidth: 300,
    borderRadius: 9,
    border: `1px solid #282629`,
    img: {
      borderRadius: 9,
    },
  },
  modalHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 500,
    color: theme.black,
  },
  modalDesc: {
    fontSize: 20,
    fontWeight: 300,
    color: "#695B54",
    lineHeight: 1.4,
  },
  item: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  itemWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${theme.black}`,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 9,
    gap: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#26170F",
    textTransform: "uppercase",
  },
  itemText: {
    width: "100%",
    fontSize: 14,
    fontWeight: 400,
    color: theme.black,
  },
  traitsWrapper: {
    width: "100%",
    display: "flex",
    borderRadius: 9,
    backgroundColor: theme.white,
    padding: 30,
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  buyWrapper: {
    width: "100%",
    display: "flex",
    padding: 30,
    gap: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  trait: {
    // width: 200,
    backgroundColor: "#E5D3CA",
    color: theme.black,
    boxShadow: "0px 2px 0px -1px rgba(0, 0, 0, 0.25)",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 9,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  traitTitle: {
    fontSize: 10,
    fontWeight: 500,
    color: "#695B54",
    lineHeight: 1,
    textAlign: "center",
    textTransform: "uppercase",
  },
  traitDesc: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.black,
    lineHeight: 1,
    textAlign: "center",
    textTransform: "uppercase",
  },
}));

const NftCard = ({ item }) => {
  const { classes } = useStyles();
  const { nfts, getNftOwner } = React.useContext(AppContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [address, setAddress] = React.useState("");
  const [owner, setOwner] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (nfts.length !== 0) {
      autoFetcher();
    }
  }, [nfts]);

  const autoFetcher = async () => {
      setLoading(true);
      let nft = nfts.filter((nft) => nft.uri === item.uri)[0];
      let own = await getNftOwner(nft.mintAddress.toBase58());
      setAddress(nft.mintAddress.toBase58());
      setOwner(own);
      setLoading(false);
    };

  const matches = useMediaQuery('(min-width: 900px)');

  return (
    <>
      <div className={classes.root} onClick={loading ? null : open}>
        {loading && <div className={classes.loaderWrapper}><Loader variant="dots" size="md" color="main" /></div>}

        {!loading && <Image src={item.image} className={classes.image} />}
        {!loading && <Text className={classes.title}>{item.name}</Text>}
        
      </div>
      <Modal
        opened={opened}
        onClose={close}
        size={!matches ? "98%" : "80%"}
        centered
        overlayOpacity={0.8}
        overlayColor="white"
        overlayBlur={2}
        withCloseButton={false}
        styles={(theme) => ({
          modal: {
            borderRadius: "9px",
            backgroundColor: "#EADFDA",
            border: `1px solid #E3CEC2`,
          },
        })}
      >
        <div className={classes.modalWrapper}>
          <div className={classes.left}>
            <Image src={item.image} className={classes.modalImage} />
            {item.collection && (
              <div className={classes.item}>
                <Text className={classes.itemTitle}>COLLECTION</Text>
                <div className={classes.itemWrapper}>
                  <Text className={classes.itemText}>
                    {item.collection?.name}
                  </Text>
                </div>
              </div>
            )}
            <div className={classes.item}>
              <Text className={classes.itemTitle}>MINT ADDRESS</Text>
              <div className={classes.itemWrapper}>
                <Text className={classes.itemText}>{address}</Text>
                <Button
                  component="a"
                  href={`https://solscan.io/token/${address}`}
                  target="_blank"
                >
                  View
                </Button>
              </div>
            </div>
            <div className={classes.item}>
              <Text className={classes.itemTitle}>OWNER</Text>
              <div className={classes.itemWrapper}>
                <Text className={classes.itemText}>{owner}</Text>
                <Button
                  component="a"
                  href={`https://solscan.io/account/${owner}`}
                  target="_blank"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.modalHeader}>
              <Text className={classes.modalTitle}>{item.name}</Text>
              {matches &&
                <CloseButton onClick={close} />
              }
            </div>
            <Text className={classes.modalDesc}>{item.description}</Text>
            <div className={classes.traitsWrapper}>
              {item.attributes.length !== 0 &&
                item.attributes.map((trait, index) => (
                  <div key={index} className={classes.trait}>
                    <Text className={classes.traitTitle}>
                      {trait.trait_type}
                    </Text>
                    <Text className={classes.traitDesc}>{trait.value}</Text>
                  </div>
                ))}
            </div>
            <div className={classes.buyWrapper}>
              <Group>
                <Button
                  component="a"
                  target="_blank"
                  href={`https://magiceden.io/item-details/${address}`}
                >
                  MagicEden
                </Button>
                <Button
                  component="a"
                  target="_blank"
                  href={`https://opensea.io/assets/solana/${address}`}
                >
                  OpenSea
                </Button>
              </Group>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NftCard;
