import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorImagesByUpdateRead = (productColorId: number) => {
  


    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_images_by_update_read", productColorId],
        queryFn: () => fetchData({ 
            path: `/product/color/image/read?productColorId=${productColorId}`,
         
          }),
            
    });
};
