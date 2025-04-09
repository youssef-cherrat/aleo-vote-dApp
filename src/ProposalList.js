// ProposalList.js
import React, { useEffect, useState } from "react";
import { useBackend } from "./BackendContext";

const ProposalList = () => {
  const backend = useBackend();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await backend.getProposals();
        setProposals(data);
      } catch (e) {
        console.error("Error fetching proposals:", e);
      }
    };
    fetchProposals();
    // Optionally, refresh periodically:
    const interval = setInterval(fetchProposals, 5000);
    return () => clearInterval(interval);
  }, [backend]);

  return (
    <div className="mt-4">
      <h2>Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div className="list-group">
          {proposals.map((proposal) => (
            <div key={proposal.proposalId} className="list-group-item">
              <h5>{proposal.title}</h5>
              <p>{proposal.description}</p>
              <p>
                <strong>Yes Votes:</strong> {proposal.agreeVotes} |{" "}
                <strong>No Votes:</strong> {proposal.disagreeVotes}
              </p>
              <small>Proposal ID: {proposal.proposalId}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalList;
