# Aleo DAO DApp

This React application provides a DAO interface using the Leo Wallet Adapter. The app supports:
- Joining the DAO
- Submitting proposals
- Voting on proposals
- Viewing proposals and their vote counts

## Backend Modes

The app can run in two modes:
- **Mock Mode:** Simulated backend that stores proposals in-memory without connecting to an actual Aleo program. Ideal for development and testing.
- **Live Mode:** Uses the Leo Wallet Adapter to send transactions to a deployed Aleo contract. Users must enter the program ID of the deployed contract.

## Requirements for the .aleo Contract (Live Mode)

Your deployed Aleo contract should expose the following transitions:
- `join`: To register a new DAO member.
- `propose`: To create a new proposal. The inputs should include the proposer’s address, a title, and a description. The contract should generate a unique proposal ID.
- `vote`: To cast a vote (e.g., with inputs for proposal ID, vote type, and the voter’s address).

The live mode expects that the contract state (proposals and vote counts) can be queried. In our mock mode, these interactions are simulated; in live mode you would need to implement state query functions to fetch proposals.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Use the toggle to switch between **Mock** and **Live** backend modes. In **Live** mode, enter your deployed contract's program ID.
