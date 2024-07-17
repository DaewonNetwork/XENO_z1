import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductListByLikedRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_list_liked__read"],
        queryFn: () => fetchData({
            path: `/product/read/like`,
            isAuthRequired: true,
        }),
    });
};