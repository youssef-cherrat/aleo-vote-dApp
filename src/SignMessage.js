// SignMessage.js
import React, { useCallback } from "react";
import { useBackend } from "./BackendContext";

const SignMessage = () => {
  const backend = useBackend();

  const onClick = useCallback(async () => {
    try {
      const signature = await backend.signMessage("a message to sign");
      alert("Signed message: " + signature);
    } catch (e) {
      console.error(e);
    }
  }, [backend]);

  return (
    <button className="btn btn-info" onClick={onClick}>
      Sign Message
    </button>
  );
};

export default SignMessage;
