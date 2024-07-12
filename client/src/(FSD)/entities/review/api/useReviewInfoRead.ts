import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewInfoRead = (reviewId:number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_info_read",reviewId],
        queryFn: () => fetchData({ path: `/review/info?reviewId=${reviewId}` }),
    });
};