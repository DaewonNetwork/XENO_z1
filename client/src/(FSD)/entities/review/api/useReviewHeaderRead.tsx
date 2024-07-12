import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useReviewHeaderRead = (orderId:number) => {
  
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["review_header_read"],
        queryFn: () => fetchData({ 
            path: `/review/header?orderId=${orderId}`,
         
          }),
            
    });
};
