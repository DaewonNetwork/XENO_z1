import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewInfoListRead = (productColorId:number,pageIndex:number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_info_list_read"],
        queryFn: () => fetchData({ path: `/review/read/list?productColorId=${productColorId}&pageIndex=${pageIndex}&size=10` }),
    });
};