import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useOrderListRead = () => {
  


    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["order_list"],
        queryFn: () => fetchData({ 
            path: `/orders/list`,
         
          }),
            
    });
};
