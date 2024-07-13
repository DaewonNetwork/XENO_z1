import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useOrderListBySellerRead = () => {

    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["order_list__seller_read"],
        queryFn: () => fetchData({ 
            path: `/orders/seller/list`,
          }),
            
    });
};
