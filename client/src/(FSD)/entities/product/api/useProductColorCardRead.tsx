import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorCardRead = (productColorId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_card_read", productColorId],
        queryFn: () => fetchData({
            path: `/product/color/read/info?productColorId=${productColorId}`,
        }),
    });
};