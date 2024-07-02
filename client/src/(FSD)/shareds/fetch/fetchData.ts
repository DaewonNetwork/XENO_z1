import { FetchType } from "../types/FetchData.type";

export const fetchData = async ({ path, method = "GET", contentType = "application/json", isAuthRequired = false, isNotAuthRequired = false, body }: FetchType) => {
    let response = null;
    console.log("path:"+path)
    response = await fetch(`http://localhost:8090${path}`, {
        method: method,
        headers: {
            "Content-Type": contentType,
        },
        body: JSON.stringify(body)
    });


   
    // const { isLoggedIn, accessToken } = useUserStore.getState();
    // if ((!isNotAuthRequired && isLoggedIn) || (isAuthRequired && isLoggedIn)) {
    //     response = await fetch(`http://localhost:8090/api${path}`, {
    //         method: method,
    //         headers: {
    //             "Content-Type": contentType,
    //             "Authorization": `Bearer ${accessToken}`,
    //         },
    //         body: JSON.stringify(body)
    //     });
    // } else {
    //     response = await fetch(`http://localhost:8090${path}`, {
    //         method: method,
    //         headers: {
    //             "Content-Type": contentType,
    //         },
    //         body: JSON.stringify(body)
    //     });
    // };

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const data = await response.json();

    return data;
};