// Wallet.js
import React, { useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

// Import default UI styles (you can override these in your app)
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

const Wallet = ({ children }) => {
  const wallets = useMemo(() => {
    return [
      new LeoWalletAdapter({
        appName: "Leo Demo App", // Replace with your app's name
      }),
    ];
  }, []);

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet} // Change to Testnet/Mainnet if needed
      autoConnect
    >
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default Wallet;
