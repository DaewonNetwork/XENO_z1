"use client";

import { useQuery } from "@tanstack/react-query";

const tokenReadFetch = async () => {
    const accessToken = localStorage.getItem("access_token")!;
    const response = await fetch("http://localhost:8090/api/user/token", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    });

    if (!accessToken) {
        return null;
    }

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const data = await response.json();

    return data;
}
export const useTokenRead = () => {
    return useQuery({
        queryKey: ["token_read"],
        queryFn: () => tokenReadFetch(),
    });
};
