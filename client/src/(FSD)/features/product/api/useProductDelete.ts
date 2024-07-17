import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


export const useProductDelete = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (productId: number) => {
            return fetchData({ path: `/product/delete?productId=${productId}`,method:"DELETE", isAuthRequired: true })
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