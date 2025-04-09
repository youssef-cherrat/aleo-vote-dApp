// Vote.js
import React, { useState, useCallback } from "react";
import { useBackend } from "./BackendContext";

const Vote = () => {
  const backend = useBackend();
  const [proposalId, setProposalId] = useState("");
  const [voteType, setVoteType] = useState("yes");

  const onVote = useCallback(async () => {
    try {
      const txId = await backend.vote(proposalId, voteType);
      console.log("Vote Transaction: ", txId);
    } catch (e) {
      console.error(e);
    }
  }, [backend, proposalId, voteType]);

  return (
    <div className="mb-3">
      <h2>Vote on Proposal</h2>
      <div className="form-group">
        <label>Proposal ID:</label>
        <input
          type="text"
          className="form-control"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Vote:</label>
        <select
          className="form-control"
          value={voteType}
          onChange={(e) => setVoteType(e.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button className="btn btn-warning mt-2" onClick={onVote}>
        Cast Vote
      </button>
    </div>
  );
};

export default Vote;
