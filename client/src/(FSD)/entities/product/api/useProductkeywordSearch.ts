import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProductkeywordSearch = (keyword: string) => {
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
        queryKey: ["search_keyword", keyword],
        queryFn: ({ pageParam, queryKey }) => fetchData({ path: `/product/search?keyword=${queryKey[1]}&pageIndex=${pageParam}&size=10` }),
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
        placeholderData: keepPreviousData,
        
    });

    const productList: ProductType[] = useMemo(() => {
        const productList = data?.pages?.flatMap(page => page.dtoList) || [];
        return productList;
    }, [data]);

    return { productList, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage, refetch };
};

