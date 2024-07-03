import { useQuery } from "@tanstack/react-query";

export const useProductDetailRead = (productId: number, size:number) => {
    console.log("아이디:", productId);
    
    return useQuery({
        queryKey: ["product_detail_image_read", productId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/readImages?productId=${productId}&size=${size}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: null, // Assuming you don't have initial placeholder data
    });
};
