import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";

export const useProductAddCart = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (productColorSizeId: number) => {
            return fetch( `http://localhost:8090/product/addCart?productColorSizeId=${productColorSizeId}`)
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