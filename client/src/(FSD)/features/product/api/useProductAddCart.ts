import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { MutationType } from "../../types/mutation.type";

interface newProductsType {
    productColorSizeId: number;
    price: number;
    quantity: number;
}

export const useProductAddCart = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (newProducts: newProductsType[]) => {
            return fetchData({
                path: "/product/addToCart",
                method: "POST",
                body: newProducts,
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
