import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorOrderBarRead = (productColorId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_order_bar_read", productColorId],
        queryFn: () => fetchData({
            path: `/product/color/readOrderBar?productColorId=${productColorId}`,
            isAuthRequired: true,
        }),
    });
};