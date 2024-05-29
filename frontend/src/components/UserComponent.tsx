// src/components/UserComponent.tsx
import React from "react";
import { useAppContext } from "../AppContext";

const UserComponent: React.FC = () => {
  const { user, setUser } = useAppContext();

  const changeUser = () => {
    setUser("Updated User");
  };

  return (
    <div>
      <h2>Current User: {user}</h2>
      <button onClick={changeUser}>Change User</button>
    </div>
  );
};

export default UserComponent;
