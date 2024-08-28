import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorOrderBarRead = (productId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_order_bar_read", productId],
        queryFn: () => fetchData({
            path: `/product/color/readOrderBar?productId=${productId}`,
            isAuthRequired: true,
        }),
    });
};