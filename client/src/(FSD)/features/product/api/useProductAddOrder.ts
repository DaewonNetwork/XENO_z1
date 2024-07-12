import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductOrderType } from "../ui/ProductPaymentBtn";
import { useRecoilValue } from "recoil";



export const useProductOrder = ({ onSuccess, onError }: MutationType) => {

   

    const fetchData = useFetchData();
 

    return useMutation({
        mutationFn: (productOrderList: ProductOrderType[]) => {
            return fetchData({
                path: "/orders",
                method: "POST",
                body: productOrderList,
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
