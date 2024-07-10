import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePrdouctListAllRead = () => {
    return useQuery({
        queryKey: ["product_read_all"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/read/all`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
