import { Button, Menu, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

const WalletButton = () => {
  const { visible, setVisible } = useWalletModal();
  const { connected, connecting, disconnecting, disconnect, publicKey } = useWallet();
  const clipboard = useClipboard({ timeout: 500 });

  const handleWallets = React.useCallback(
    (event) => {
      if (!event.defaultPrevented) setVisible(!visible);
    },
    [setVisible, visible]
  );

  const handleLogout = React.useCallback(
    (event) => {
      if (!event.defaultPrevented) disconnect();
    },
    [disconnect]
  );

  const handleClipboard = React.useCallback(() => {
    clipboard.copy(publicKey.toBase58());
  }, [publicKey, clipboard])

  return (
    <Menu transition="pop-top-right" position="top-center" width={200} styles={(theme) => ({
      dropdown: {
        border: `1px solid ${theme.black}`,
        backgroundColor: "#EADDD6",
        borderRadius: 9,
        
      },
      item: {
        backgroundColor: "#EADDD6",
        borderRadius: 9,
      }
    })}>
      <Menu.Target>
        <Button
          sx={{
            borderRadius: "9px",
          }}
          // leftIcon={<IconWallet size={22} />}
        >
          {connected
            ? (publicKey.toBase58().substring(0, 4) + "...").toUpperCase()
            : connecting
            ? "Connecting...".toUpperCase()
            : disconnecting
            ? "Disconnecting...".toUpperCase()
            : "Connect Wallet".toUpperCase()}
        </Button>
      </Menu.Target>
      {
        connected ?
            <Menu.Dropdown>
              <Menu.Item
                onClick={handleClipboard}
                rightSection={
                    <Text size="xs" transform="uppercase" weight={700}>
                    Copy Address
                    </Text>
                }
                />
              <Menu.Item
                onClick={handleLogout}
                rightSection={
                    <Text size="xs" transform="uppercase" weight={700}>
                    Log Out
                    </Text>
                }
                />
            </Menu.Dropdown>
        :
            <Menu.Dropdown>
                <Menu.Item
                onClick={handleWallets}
                rightSection={
                    <Text size="xs" transform="uppercase" weight={700}>
                    Select Wallets
                    </Text>
                }
                />
            </Menu.Dropdown>
      }
    </Menu>
  );
};

export default WalletButton;
