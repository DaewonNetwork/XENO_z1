import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useCartSummary = (userId: number) => {
    return useQuery({
        queryKey: ["cart_summary", userId],
        queryFn: () => fetchData({ path: `/cart/summary`, isAuthRequired: true }),
    });
};