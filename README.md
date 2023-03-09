UI/UX Case study:

Goals:

- Search a wallet and get the NFTs it has;
- Sort in a grid with a very clear view of the NFT;
- More NFT details should be displayed when clicking;
- A button to purchase the NFT must be displayed;
- It must be visually appealing and easy to use;

Decisions:

- Nature of color - Warm:
Working with warm colors using few functionalities will allow the user to find all the options available in the application on the screen.

- Nature of the site - Box:
Working with the boxed layout will allow the user to have the same experience when accessing the application on several different screens, contributing to the 'culture' of the application, teaching users to become familiar with the UI.

- Shapes - Slightly rounded:
As this is a web application that aims to make the user use the site several times, the slightly rounded edges will give a feeling of smoothness and familiarity with the interface, taking into the consistency of the layout.

- Shadows - Y axis with little blur:
Using the shadow only on the Y axis with little blur and with the warm nature of the color, it will give the user the feeling that whenever he is using the site, it is 'noon'. Due to the warm color indicating that the light is coming from the sun, the shadow without X-axis deviation indicates that the sun is currently at the top of the 'sky'.

=============================================

React.js/Javascript/Frameworks:

index.js:
- Hydrates or renders the client dom via id #root and returns the 'Dapp.js' component.

Dapp.js:
- Connects to Solana's cluster and enables login via wallets: Solflare, Sollet, Coinbase, Phantom, Brave, Glow and Torus;
- Wraps the connection settings and renders the 'App.js' component.

App.js:
- Configures Mantine's provider, normalizing CSS and ensuring global styles;
- It imports the global state store from React.useContext and encompasses the entire application, rendering the 'Home.jsx' component.

JSX Components:
- Using Mantine.createStyles to create classes within each component;
- Using Mantine.stylizedComponents for CSS manipulation of Mantine components;
- Using Mantine.SX to edit the CSS of the Mantine component itself;
- Using React.useContext to give context to components using Javascript checks in JSX (Eg: {!isLoading ? "Loading..." : "Loaded!"}).

Home.jsx:
- Gathering all application information within the same component.

WalletButton.jsx:
- Using Mantine.useClipboard to manipulate the user's clipboard;
- Opens the connection popup with the wallets, when logged in it shows the initial 4 characters of the wallet and when clicked it allows copying the wallet address and logging out.

WalletSearch.jsx:
- It uses a state for the wallet address, having the option to clear the state and do the submit, which activates the 'NftsFrame.jsx' component.

- NftsFrame.jsx:
Using a Mantine.ScrollArea to maintain a 65% aspect of the viewport aiming to be functional on any device with a grid of 1 to 4 columns that render the 'NftCard.jsx' component.

=============================================

DevOps:

CRA5

- Node.js: v18.15.0

Package and versions:
- @emotion/react: v11.10.6
- @mantine/core: v5.10.5
- @mantine/hooks: v5.10.5
- @metaplex-foundation/js: v0.18.3
- @metaplex/js: v4.12.0
- @project-serum/anchor: v0.25.0
- @solana/spl-token: v0.3.5
- @solana/wallet-adapter-base: v0.9.22
- @solana/wallet-adapter-react: v0.15.30
- @solana/wallet-adapter-react-ui: v0.9.29
- @solana/wallet-adapter-wallets: v0.19.15
- @solana/web3.js: v1.73.3
- browserify-zlib: v0.2.0
- buffer: v6.0.3
- process: v0.11.10
- react: v18.2.0
- react-app-rewired: v2.2.1
- react-dom: v18.2.0
- react-router-dom: v6.4.1
- react-scripts: v5.0.1
- stream-browserify: v3.0.0
- typewriter-effect: v2.19.0
- web-vitals: v2.1.4
