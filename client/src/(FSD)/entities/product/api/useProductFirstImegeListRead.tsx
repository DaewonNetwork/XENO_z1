import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductFirstImegeListRead = (productColorId: number) => {
  


    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_first_image_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/readFirstImages?productColorId=${productColorId}`,
         
          }),
            
    });
};
