import { Button, Menu, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

const WalletButton = () => {
  const { visible, setVisible } = useWalletModal();
  const { connected, connecting, disconnecting, disconnect, publicKey } = useWallet();

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

  const theme = useMantineTheme();

  const [opened, { close }] = useDisclosure(false);

  return (
    <Menu transition="pop-top-right" position="top-start" width={200} styles={(theme) => ({
      dropdown: {
        border: "none",
      }
    })}>
      <Menu.Target>
        <Button
          sx={{
            color: theme.white,
            backgroundColor: theme.black,
            borderRadius: "11px",
          }}
          // leftIcon={<IconWallet size={22} />}
        >
          {connected
            ? (publicKey.toBase58().substring(0, 4) + "..." + publicKey.toBase58().substr(-4)).toUpperCase()
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
                onClick={handleLogout}
                rightSection={
                    <Text size="xs" transform="uppercase" weight={700} color="dimmed">
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
                    <Text size="xs" transform="uppercase" weight={700} color="dimmed">
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
