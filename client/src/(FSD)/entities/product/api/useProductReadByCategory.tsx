
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductReadByCategory = (categoryId: string,categorySubId:string) => {
   
    const fetchData = useFetchData();
    return useQuery({
        queryKey: ["product_read_category", categoryId,categorySubId],
        queryFn: () => fetchData({ 
            path: `/product/read/category?categoryId=${categoryId}&categorySubId=${categorySubId}`,
            isAuthRequired: true, 
          }),
    
    });
};
