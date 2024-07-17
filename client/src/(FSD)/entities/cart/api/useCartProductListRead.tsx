import { useQuery } from "@tanstack/react-query";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useCartProductListRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["cart_product_list_read"],
        queryFn: () => fetchData({ path: "/cart", isAuthRequired: true }),
    });
};