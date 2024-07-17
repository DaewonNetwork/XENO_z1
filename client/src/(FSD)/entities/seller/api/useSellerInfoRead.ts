import { useQuery } from "@tanstack/react-query";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useSellerInfoRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["seller_info_read"],
        queryFn: () => fetchData({ path: "/seller/read", isAuthRequired: true }),
    });
};
