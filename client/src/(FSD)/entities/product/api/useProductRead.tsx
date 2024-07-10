import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductRead = (productColorId: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/read?productColorId=${productColorId}`,
            isAuthRequired: true, 
          }),
            
    });
};
