interface fetchServerDataType {
    path: string;
    isLoggedIn?: boolean;
}

export const fetchServerData = async ({ path, isLoggedIn = false }: fetchServerDataType) => {
    let response = null;

    if (isLoggedIn) {
        response = await fetch(`http://localhost:8090/api${path}`);
    } else {
        response = await fetch(`http://localhost:8090${path}`);
    }
    
    const data = response.json();

    // if (!response.ok) {
    //     const errorMessage = await response.text();
    //     throw new Error(errorMessage);
    // };

    return data;
}