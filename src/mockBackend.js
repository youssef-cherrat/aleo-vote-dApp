// mockBackend.js
let proposals = []; // Array to store proposals

export const joinDAO = async (publicKey) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`MOCK_JOIN_TXID_${publicKey}`);
    }, 500);
  });
};

export const propose = async (publicKey, title, description) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a unique proposal id using the current timestamp
      const proposalId = Date.now().toString();
      // Create a proposal object with initial vote counts
      const newProposal = {
        proposalId,
        proposer: publicKey,
        title,
        description,
        agreeVotes: 0,
        disagreeVotes: 0,
      };
      // Save the proposal in memory
      proposals.push(newProposal);
      resolve({ txId: `MOCK_PROPOSE_TXID_${proposalId}`, proposalId });
    }, 500);
  });
};

export const vote = async (proposalId, voteType, publicKey) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the proposal and update vote counts
      const proposal = proposals.find((p) => p.proposalId === proposalId);
      if (proposal) {
        if (voteType === "yes") {
          proposal.agreeVotes += 1;
        } else if (voteType === "no") {
          proposal.disagreeVotes += 1;
        }
      }
      resolve(`MOCK_VOTE_TXID_${proposalId}_${voteType}`);
    }, 500);
  });
};

export const signMessage = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`MOCK_SIGNATURE_${message}`);
    }, 200);
  });
};

// New function to retrieve proposals
export const getProposals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(proposals);
    }, 300);
  });
};
