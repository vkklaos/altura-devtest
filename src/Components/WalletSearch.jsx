
import React from "react";
import { TextInput, ActionIcon, useMantineTheme, Image } from '@mantine/core';
import SearchSVG from "../Assets/Svgs/search.svg";
import { AppContext } from '../Context';

export function WalletSearch(props) {
  const theme = useMantineTheme();

  const { getNfts } = React.useContext(AppContext);

  const [ value, setValue ] = React.useState("");

  const handleSubmit = async () => {
      await getNfts(value);
  }

  return (
    <TextInput
      rightSection={
        <ActionIcon onClick={handleSubmit} size={24} radius="xl" color={theme.black} variant="filled">
          <Image src={SearchSVG} w={11} />
        </ActionIcon>
      }
      autoComplete="off"
      placeholder="Paste wallet address to check NFTs"
      rightSectionWidth={42}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      styles={(theme) => ({
        wrapper: {
          width: 460,
          height: 40,
        },
        input: {
         backgroundColor: "#EADDD6",
         borderRadius: 9,
         border: `1px solid #DABDAD`,
         color: theme.black,
         fontWeight: 400,
         fontSize: 16,
         lineHeight: 1,
         boxShadow: "0px 3px 1px -1px rgba(0, 0, 0, 0.25)",
        ":focus": {
          color: theme.black,
          boxShadow: "0px 6px 3px -2px rgba(10, 11, 15, 0.21)",
        },
        }
      })}
      {...props}
    />
  );
}