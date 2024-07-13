
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useOrderListRead = () => {
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
        queryKey: ["order_list_read"],
        queryFn: ({ pageParam }) => fetchData({ path: `/orders/list?pageIndex=${pageParam}&size=5` }),
        getNextPageParam: (lastPage) => {
            console.log(lastPage);
            
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

    const orderList: OrderInfoType[] = useMemo(() => {
        const orderList = data?.pages?.flatMap(page => page.dtoList) || [];
        return orderList;
    }, [data]);

    return { orderList, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage, refetch };
};