import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useCartSummary = () => {
    return useQuery({
        queryKey: ["cart_summary"],
        queryFn: () => fetchData({ 
            path: "/cart/summary", 
            isAuthRequired: true }),
    });
};