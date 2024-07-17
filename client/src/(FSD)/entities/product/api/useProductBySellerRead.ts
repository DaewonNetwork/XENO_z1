import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductBySellerRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_seller_read"],
        queryFn: () => fetchData({
            path: `/product/seller/read`,
        }),
    });
};