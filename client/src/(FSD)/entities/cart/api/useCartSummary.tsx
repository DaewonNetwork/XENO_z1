import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useCartSummary = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["cart_summary"],
        queryFn: () => fetchData({ path: "/cart/summary", isAuthRequired: true }),
    });
};