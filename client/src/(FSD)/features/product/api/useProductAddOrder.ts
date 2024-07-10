import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductOrderType } from "../ui/ProductPaymentBtn";


export const useProductOrder = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (productOrderList: ProductOrderType[]) => {
            return fetchData({
                path: "/api/orders",
                method: "POST",
                body: productOrderList,
                isNotAuthRequired: true
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
