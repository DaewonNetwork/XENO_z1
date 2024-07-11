import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductCardRead = (productColorId: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_card_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/read/info?productColorId=${productColorId}`,
          }),
            
    });
};
