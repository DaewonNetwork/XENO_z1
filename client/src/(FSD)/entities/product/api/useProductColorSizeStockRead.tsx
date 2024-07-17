import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorSizeStockRead = (productColorId: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_size_stock_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/color/size/read?productColorId=${productColorId}`,
          }),
            
    });
};
