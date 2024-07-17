import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductOrderType } from "../../order/ui/OrderPaymentBtn";
import { useRecoilValue } from "recoil";



export const useProductOrder = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();
 
    return useMutation({
        mutationFn: (OrderInfoList: ProductOrderType[]) => {
            return fetchData({
                path: "/orders",
                method: "POST",
                body: OrderInfoList,
                isAuthRequired: true
            });
        },
        onSuccess: (data:any) => {
            console.log(data)
            onSuccess(data);
        },
        onError: () => {
            if (onError) {
                onError();
            }
        }
    });
};
