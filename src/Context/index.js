import React from "react";
import { Metaplex } from '@metaplex-foundation/js';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

export const AppContext = React.createContext({});
export const AppStorage = ({ children }) => {

    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ nfts, setNfts ] = React.useState([]);
    const [ user, setUser ] = React.useState("");

    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();

    const metaplex = Metaplex.make(connection);

    const getNftOwner = async (mint) => {
        const largestAccounts = await connection.getTokenLargestAccounts(
            new web3.PublicKey(mint)
          );
          const largestAccountInfo = await connection.getParsedAccountInfo(
            largestAccounts.value[0].address
          );
        return largestAccountInfo.value.data.parsed.info.owner;
    }

    const getNfts = async (address) => {
      let pkey = new web3.PublicKey(address);
      if (web3.PublicKey.isOnCurve(pkey)) {
        setIsLoading(true);
        await metaplex.nfts().findAllByOwner({owner: new web3.PublicKey(address)}).then((nfts) => {
          setNfts(nfts);
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      }
    }

    React.useEffect(() => {
        if (connected && publicKey) {
          getNfts(publicKey.toBase58());
          setUser(publicKey.toBase58());
        }
    }, [connected, publicKey])


    return (
        <AppContext.Provider
          value={{
            nfts,
            user,
            getNftOwner,
            getNfts,
            isLoading,
            setIsLoading,
          }}
        >
          {children}
        </AppContext.Provider>
      );
}