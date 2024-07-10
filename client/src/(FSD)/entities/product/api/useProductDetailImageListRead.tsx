import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductDetailImageListRead = (productColorId: number, size:number) => {
    
    return useQuery({
        queryKey: ["product_detail_image_read", productColorId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/readImages?productColorId=${productColorId}&size=${size}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
};
