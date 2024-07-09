import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";

export const useProductLikeToggle = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (productColorId: number) => {
            return fetchData({ path: `/like?productColorId=${productColorId}`, isAuthRequired: true })
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