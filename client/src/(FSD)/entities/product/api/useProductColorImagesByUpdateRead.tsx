import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorImagesByUpdateRead = (productId: number) => {
  


    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_images_by_update_read", productId],
        queryFn: () => fetchData({ 
            path: `/product/color/image/read?productId=${productId}`,
         
          }),
            
    });
};
