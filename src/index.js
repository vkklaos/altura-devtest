import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Dapp from './Dapp';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

if (container.hasChildNodes()) {
  root.hydrate(
      <Dapp />
  );
} else {
  root.render(
      <Dapp />
  );
}

