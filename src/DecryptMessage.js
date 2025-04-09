// DecryptMessage.js
import React, { useCallback } from "react";
import { useBackend } from "./BackendContext";

const DecryptMessage = () => {
  const backend = useBackend();

  const onClick = useCallback(async () => {
    try {
      // In this mock, we simulate decryption by calling signMessage with a placeholder.
      const decrypted = await backend.signMessage("decrypt me");
      alert("Decrypted message: " + decrypted);
    } catch (e) {
      console.error(e);
    }
  }, [backend]);

  return (
    <button className="btn btn-secondary" onClick={onClick}>
      Decrypt Message
    </button>
  );
};

export default DecryptMessage;
