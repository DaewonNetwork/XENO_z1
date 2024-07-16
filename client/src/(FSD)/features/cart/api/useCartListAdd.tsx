import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


export const useCartListAdd = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();
    
    return useMutation({
        mutationFn: (data: any) => {
            return fetchData({ path: "/cart", method: "POST", body: data, isAuthRequired: true });
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