import { fetchData } from "@/(FSD)/shareds/fetch/fetchData"
import { useQuery } from "@tanstack/react-query"

export const useProductReviewListRead = () => {
    return useQuery({
        queryKey: ["product_review_list_read"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8090/reviews`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        },
        placeholderData: null,
    });
};