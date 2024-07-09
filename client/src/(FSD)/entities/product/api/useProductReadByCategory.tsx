import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductReadByCategory = (categoryId: string,categorySubId:string) => {
   
    
    return useQuery({
        queryKey: ["product_read_category", categoryId,categorySubId],
        queryFn: () => fetchData({ 
            path: `/product/read/category?categoryId=${categoryId}&categorySubId=${categorySubId}`,
            isAuthRequired: true, 
          }),
    
    });
};
