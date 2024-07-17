import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductRead = (productId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_read", productId],
        queryFn: () => fetchData({
            path: `/product/read?productId=${productId}`,
        }),
    });
};