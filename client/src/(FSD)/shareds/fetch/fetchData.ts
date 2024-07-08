import { FetchType } from "../types/FetchData.type";

export const fetchData = async ({ path, method = "GET", contentType = "application/json", isAuthRequired = false, isNotAuthRequired = false, body }: FetchType) => {
    let response = null;
    console.log("path:" + path)

    const isLoggedIn: boolean = !!localStorage.getItem("access_token");



    if ((!isNotAuthRequired && isLoggedIn) || isAuthRequired) {
       
        response = await fetch(`http://localhost:8090/api${path}`, {
            method: method,
            headers: {
                "Content-Type": contentType,
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: body
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

    const data = await response.json();



    return data;
};