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

    const getNft = async (mint) => {
        const nft = await metaplex.nfts().findByMint({mintAddress: new web3.PublicKey(mint)});
        let res = await fetch(nft.uri);
        let json = await res.json();
        return json;
    }

    const getNfts = async (address) => {
        setIsLoading(true);
        console.log(address);
        const nfts = await metaplex.nfts().findAllByOwner({owner: new web3.PublicKey(address)});
        const uris = nfts.map((nft) => {
            return nft.uri
        });
        Promise.all(
            uris.filter((uri) => uri.startsWith("http")).map(async (uri) => {
                let res = await fetch(uri);
                let json = await res.json();
                return json;
            })
        ).then((json) => {
            console.log(json);
            setNfts(json);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            console.log(err);
            setNfts([]);
        })
    }

    React.useEffect(() => {
        if (connected && publicKey) {
            setUser(publicKey.toBase58());
            getNfts(publicKey.toBase58());
        }
    }, [connected, publicKey])


    return (
        <AppContext.Provider
          value={{
            nfts,
            user,
            getNfts,
            isLoading,
          }}
        >
          {children}
        </AppContext.Provider>
      );
}