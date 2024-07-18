import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


export const useCartListDelete = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();
    
    return useMutation({
        mutationFn: (cartId: number) => {
            return fetchData({ path: `/cart?cartId=${cartId}`, method: "DELETE", isAuthRequired: true });
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};