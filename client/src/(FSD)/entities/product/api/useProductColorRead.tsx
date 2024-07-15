import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorRead = (productColorId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_read", productColorId],
        queryFn: () => fetchData({
            path: `/product/color/read?productColorId=${productColorId}`,
        }),
    });
};