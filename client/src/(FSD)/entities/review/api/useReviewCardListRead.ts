
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ReviewCardType } from "@/(FSD)/shareds/types/review/ReviewCard.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useReviewCardListRead = () => {
    const fetchData = useFetchData();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isPending,
        refetch
    } = useInfiniteQuery({
        queryKey: ["review_list_read"],
        queryFn: ({ pageParam }) => fetchData({ path: `/review/page/card?pageIndex=${pageParam}&size=15` }),
        getNextPageParam: (lastPage) => {
  
            
            if (lastPage.next) {
                return lastPage.pageIndex + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const reviewList: ReviewCardType[] = useMemo(() => {
        const reviewList = data?.pages?.flatMap(page => page.dtoList) || [];
        return reviewList;
    }, [data]);

    return { reviewList, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage, refetch };
};