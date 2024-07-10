import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductListByLikedRead = () => {

    return useQuery({
        queryKey: ["product_list_liked__read"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/read/like`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
