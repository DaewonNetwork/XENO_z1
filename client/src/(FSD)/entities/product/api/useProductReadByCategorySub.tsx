import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductReadByCategorySub = (categorySubId: string) => {
   
    
    return useQuery({
        queryKey: ["product_read_category_sub", categorySubId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/read/categorySub?categorySubId=${categorySubId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
