import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorSizeStockRead = (productId: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_size_stock_read", productId],
        queryFn: () => fetchData({ 
            path: `/product/color/size/read?productId=${productId}`,
          }),
            
    });
};
