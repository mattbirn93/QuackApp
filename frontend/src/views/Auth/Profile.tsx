// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchProtectedData } from "../api/auth";

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const response = await fetchProtectedData(token);
      setData(response);
    };
    getData();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Profile;
