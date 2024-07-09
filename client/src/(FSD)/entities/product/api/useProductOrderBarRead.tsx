import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductOrderBarRead = (productColorId: number) => {

    
    return useQuery({
        queryKey: ["product_order_bar_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/readOrderBar?productColorId=${productColorId}`,
            isAuthRequired: true, 
          }),
            
    });
};
