// src/api/auth.ts
import axios from "axios";

export const fetchProtectedData = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("/protected", config);
    return response.data;
};
