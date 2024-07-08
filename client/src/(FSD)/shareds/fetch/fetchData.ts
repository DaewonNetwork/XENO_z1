"use client"

import { useRecoilValue } from "recoil";
import { FetchType } from "../types/FetchData.type";
import { userState } from "../stores/UserAtom";

export const    fetchData = async ({ path, method = "GET", contentType = "application/json", isAuthRequired = false, isNotAuthRequired = false, body }: FetchType) => {
    let response = null;

    const { isLoggedIn, accessToken } = useRecoilValue(userState);

    console.log(isLoggedIn);
    
    if ((!isNotAuthRequired && isLoggedIn) || (isAuthRequired && isLoggedIn)) {
        response = await fetch(`http://localhost:8090/api${path}`, {
            method: method,
            headers: {
                "Content-Type": contentType,
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body)
        });
    } else {
        response = await fetch(`http://localhost:8090${path}`, {
            method: method,
            headers: {
                "Content-Type": contentType,
            },
            body: JSON.stringify(body)
        });
    };

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    console.log(response);
    

    const data = await response.json();

    return data;
};