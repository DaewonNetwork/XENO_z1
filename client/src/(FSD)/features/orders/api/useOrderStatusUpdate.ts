import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderStatusChangeType } from "@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn";



export const useOrderStatusUpdate = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (status: OrderStatusChangeType) => {
            return fetchData({
                path: "/orders/seller/status/update",
                method: "PUT",
                body: status,
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
