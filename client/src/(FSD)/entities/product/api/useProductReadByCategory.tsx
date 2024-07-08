import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductReadByCategory = (categoryId: string,categorySubId:string) => {
   
    
    return useQuery({
        queryKey: ["product_read_category", categoryId,categorySubId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/read/category?categoryId=${categoryId}&categorySubId=${categorySubId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
