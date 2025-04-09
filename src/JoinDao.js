// JoinDao.js
import React, { useCallback } from "react";
import { useBackend } from "./BackendContext";

const JoinDao = () => {
  const backend = useBackend();

  const onClick = useCallback(async () => {
    try {
      const txId = await backend.joinDAO();
      console.log("DAO Join Transaction: ", txId);
    } catch (e) {
      console.error(e);
    }
  }, [backend]);

  return (
    <button className="btn btn-primary" onClick={onClick}>
      Join DAO
    </button>
  );
};

export default JoinDao;
