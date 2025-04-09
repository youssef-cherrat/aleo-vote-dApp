// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Wallet from "./Wallet";
import SignMessage from "./SignMessage";
import DecryptMessage from "./DecryptMessage";
import JoinDAO from "./JoinDao";
import ProposalForm from "./ProposalForm";
import Vote from "./Vote";
import ProposalList from "./ProposalList";
import { BackendProvider } from "./BackendContext";

function App() {
  const [mode, setMode] = useState("mock"); // "mock" or "live"
  const [programId, setProgramId] = useState("dao4325243543254325.aleo");

  return (
    <Wallet>
      <div className="container mt-4">
        <h1 className="mb-4">Aleo DAO DApp</h1>
        <div className="mb-3">
          <label>Backend Mode:</label>
          <select
            className="form-control"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="mock">Mock</option>
            <option value="live">Live</option>
          </select>
        </div>
        {mode === "live" && (
          <div className="mb-3">
            <label>Program ID:</label>
            <input
              type="text"
              className="form-control"
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
            />
          </div>
        )}
        <BackendProvider mode={mode} programId={programId}>
          <div className="card p-4">
            <JoinDAO />
            <hr />
            <SignMessage />
            <hr />
            <DecryptMessage />
            <hr />
            <ProposalForm />
            <hr />
            <Vote />
            <hr />
            <ProposalList />
          </div>
        </BackendProvider>
      </div>
    </Wallet>
  );
}

export default App;
