import { useQuery } from "@tanstack/react-query";

export const useProductOrderBarRead = (productColorId: number) => {
    console.log("아이디:", productColorId);
    
    return useQuery({
        queryKey: ["product_order_bar_read", productColorId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/product/readOrderBar?productColorId=${productColorId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: null, // Assuming you don't have initial placeholder data
    });
};
