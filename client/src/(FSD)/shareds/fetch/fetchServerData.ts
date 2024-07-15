interface fetchServerDataType {
    path: string;
}

export const fetchServerData = async ({ path, }: fetchServerDataType) => {
    const response = await fetch(`http://localhost:8090${path}`);
    
    const data = response.json();

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    return data;
} 