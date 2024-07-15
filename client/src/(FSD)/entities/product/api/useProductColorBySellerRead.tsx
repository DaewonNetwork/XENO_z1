import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorBySellerRead = () => {

    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color/seller_read"],
        queryFn: () => fetchData({ 
            path: `/product/color/seller/read`,
          }),
            
    });
};
