import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductRead = (productColorId: number) => {
   
    
    return useQuery({
        queryKey: ["product_read", productColorId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/read?productColorId=${productColorId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
