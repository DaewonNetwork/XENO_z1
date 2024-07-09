import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewCardListRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_card_list_read"],
        queryFn: () => fetchData({ path: "/reviews" }),
    });
};