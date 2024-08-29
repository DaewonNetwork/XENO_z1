import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorFirstImegeListRead = (productId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_first_image_read", productId],
        queryFn: () => fetchData({
            path: `/product/color/readFirstImages?productId=${productId}`,
        }),
    });
};