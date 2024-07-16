import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderListSellerRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order_list_seller_read"],
        queryFn: () => fetchData({ path: "/orders/seller/list" })
    });
};
