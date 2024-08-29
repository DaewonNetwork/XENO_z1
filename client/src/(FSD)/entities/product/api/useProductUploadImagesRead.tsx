import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductUploadImagesRead = () => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_upload_images_read"],
        queryFn: () => fetchData({ 
            path: `/product/read/all-upload-images`,
          }),
            
    });
};
