import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorRead = (productId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_read", productId],
        queryFn: () => fetchData({
            path: `/product/color/read?productId=${productId}`,
        }),
    });
};