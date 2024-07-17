import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorFirstImegeListRead = (productColorId: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_first_image_read", productColorId],
        queryFn: () => fetchData({
            path: `/product/color/readFirstImages?productColorId=${productColorId}`,
        }),
    });
};