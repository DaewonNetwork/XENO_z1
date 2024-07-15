import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorDetailImageListRead = (productColorId: number, size:number) => {
    
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_detail_image_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/color/readImages?productColorId=${productColorId}`,
          }),
            
    });
};
