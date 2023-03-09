import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter, SolletExtensionWalletAdapter, CoinbaseWalletAdapter, PhantomWalletAdapter, BraveWalletAdapter, GlowWalletAdapter, TorusWalletAdapter  } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import App from './App';
require('@solana/wallet-adapter-react-ui/styles.css');

const Dapp = () => {
  // const network = WalletAdapterNetwork.Mainnet;
  const endpoint = React.useMemo(() => "https://solana-mainnet.g.alchemy.com/v2/hM51ynrZPDEtL_80Di-Kf6_RhQj24TKv", []);
  const wallets = React.useMemo(() => [
    new SolflareWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new PhantomWalletAdapter(),
    new BraveWalletAdapter(),
    new GlowWalletAdapter(),
    new TorusWalletAdapter()
  ],[]);

  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <App />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  );
}


export default Dapp;
