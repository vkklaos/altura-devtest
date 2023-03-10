
import React from "react";
import { TextInput, ActionIcon, useMantineTheme, Image, Notification, Affix, Transition } from '@mantine/core';
import SearchSVG from "../Assets/Svgs/search.svg";
import Backspace from "../Assets/Svgs/backspace.svg";

import { AppContext } from '../Context';

export function WalletSearch(props) {
  const theme = useMantineTheme();

  const { getNfts, isLoading, user } = React.useContext(AppContext);

  const [ value, setValue ] = React.useState("");
  const [ error, setError ] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length !== 0) {
      getNfts(value).then(() => {
        setError(false);
      }).catch((err) => {
        setError(true);
      });
    }
  }

  const handleClear = () => {
    setValue("");
  }

  React.useEffect(() => {
    if (user !== "") {
      setValue(user);
    }
  }, [user]);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    }}>
      {!isLoading &&  user !== "" &&
        <ActionIcon onClick={handleClear} size={24} radius={9} color={theme.black} variant="transparent">
          <Image src={Backspace} w={11} />
        </ActionIcon>
      }
      <TextInput
        rightSection={
          !isLoading &&  user !== "" &&
          <ActionIcon type="submit" size={24} radius={9} color={theme.black} variant="filled">
            <Image src={SearchSVG} w={11} />
          </ActionIcon>
        }
        autoComplete="off"
        placeholder={user === "" ? "Please connect wallet"  : user.substring(0,6) + "..."}
        rightSectionWidth={42}
        disabled={isLoading ? true : user === "" ? true : false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        styles={(theme) => ({
          wrapper: {
            minWidth: "60vw",
            width: "100%",
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
            border: `1px solid #DABDAD`,
          },
          }
        })}
        {...props}
      />
      <Affix position={{ top: 20, right: 10 }}>
        <Transition transition="pop" mounted={error}>
          {(transitionStyles) => (
            <Notification
              color="red"
              style={transitionStyles}
              title="Incorrect address"
              styles={(theme) => ({
                root: {
                  border: "1px solid #DABDAD",
                }
              })}
              onClose={() => setError(false)}
            >
              Must be a correct Solana address
            </Notification>
          )}
        </Transition>
      </Affix>
      
    </form>
  );
}