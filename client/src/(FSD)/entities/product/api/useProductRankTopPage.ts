import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProductRankTopPage = () => {
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
        queryKey: ["product_rankl_top_page"],
        queryFn: ({ pageParam }) => fetchData({ path: `/product/rank/page/상의?pageIndex=${pageParam}&size=10`, isNotAuthRequired: true }),
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

    const productCardList: ProductType[] = useMemo(() => {
        const productCardList = data?.pages?.flatMap(page => page.dtoList) || [];
        return productCardList;
    }, [data]);    

    return { productCardList, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage, refetch };
};