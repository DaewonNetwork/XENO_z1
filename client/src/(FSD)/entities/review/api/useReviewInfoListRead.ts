import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewInfoListRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_info_list_read"],
        queryFn: () => fetchData({ path: "/review/page/info" }),
    });
};