// BackendContext.js
import React, { createContext, useContext } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import * as mockBackend from "./mockBackend";

const BackendContext = createContext(null);

export const BackendProvider = ({ mode, programId, children }) => {
  const { publicKey, requestTransaction } = useWallet();

  const backend =
    mode === "live"
      ? {
          // Live backend calls using the Leo wallet adapter.
          joinDAO: async () => {
            if (!publicKey) throw new WalletNotConnectedError();
            const inputs = [publicKey];
            const fee = 35000;
            const tx = Transaction.createTransaction(
              publicKey,
              WalletAdapterNetwork.Testnet,
              programId,
              "join",
              inputs,
              fee
            );
            return requestTransaction(tx);
          },
          propose: async (title, description) => {
            if (!publicKey) throw new WalletNotConnectedError();
            const inputs = [publicKey, title, description];
            const fee = 35000;
            const tx = Transaction.createTransaction(
              publicKey,
              WalletAdapterNetwork.Testnet,
              programId,
              "propose",
              inputs,
              fee
            );
            return requestTransaction(tx);
          },
          vote: async (proposalId, voteType) => {
            if (!publicKey) throw new WalletNotConnectedError();
            const inputs = [proposalId, voteType, publicKey];
            const fee = 35000;
            const tx = Transaction.createTransaction(
              publicKey,
              WalletAdapterNetwork.Testnet,
              programId,
              "vote",
              inputs,
              fee
            );
            return requestTransaction(tx);
          },
          signMessage: async (message) => {
            if (!publicKey) throw new WalletNotConnectedError();
            const bytes = new TextEncoder().encode(message);
            const signatureBytes = await publicKey.adapter.signMessage(bytes);
            return new TextDecoder().decode(signatureBytes);
          },
          // In live mode, you would need a proper query to fetch proposals.
          getProposals: async () => {
            // For now, we return an empty array.
            return [];
          },
        }
      : {
          // Mock backend calls – simulate a delay and update in-memory state.
          joinDAO: async () => {
            return mockBackend.joinDAO(publicKey || "MOCK_PUBLICKEY");
          },
          propose: async (title, description) => {
            return mockBackend.propose(publicKey || "MOCK_PUBLICKEY", title, description);
          },
          vote: async (proposalId, voteType) => {
            return mockBackend.vote(proposalId, voteType, publicKey || "MOCK_PUBLICKEY");
          },
          signMessage: async (message) => {
            return mockBackend.signMessage(message);
          },
          getProposals: async () => {
            return mockBackend.getProposals();
          },
        };

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => useContext(BackendContext);
