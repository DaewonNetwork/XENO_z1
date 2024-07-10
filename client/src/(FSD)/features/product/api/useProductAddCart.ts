import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

interface newProductsType {
    productColorSizeId: number;
    price: number;
    quantity: number;
}

export const useProductAddCart = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

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
