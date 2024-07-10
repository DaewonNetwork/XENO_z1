
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductOrderBarRead = (productColorId: number) => {

    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_order_bar_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/readOrderBar?productColorId=${productColorId}`,
            isAuthRequired: true, 
          }),
            
    });
};
