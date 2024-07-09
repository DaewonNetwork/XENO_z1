import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewInfoRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_info_read"],
        queryFn: () => fetchData({ path: "/review/info" }),
    });
};