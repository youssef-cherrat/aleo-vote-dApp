// ProposalForm.js
import React, { useState, useCallback } from "react";
import { useBackend } from "./BackendContext";

const ProposalForm = () => {
  const backend = useBackend();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lastProposalId, setLastProposalId] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        // Call the mock propose function which now returns an object
        const result = await backend.propose(title, description);
        console.log("Proposal submitted: ", result);
        if (result.proposalId) {
          setLastProposalId(result.proposalId);
          alert(`Proposal submitted. ID: ${result.proposalId}`);
        } else {
          alert(`Proposal submitted. txId: ${result}`);
        }
        setTitle("");
        setDescription("");
      } catch (e) {
        console.error(e);
      }
    },
    [backend, title, description]
  );

  return (
    <form onSubmit={onSubmit} className="mb-3">
      <h2>Submit a Proposal</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success mt-2">
        Submit Proposal
      </button>
      {lastProposalId && (
        <div className="alert alert-info mt-2">
          Last Proposal ID: {lastProposalId}
        </div>
      )}
    </form>
  );
};

export default ProposalForm;
