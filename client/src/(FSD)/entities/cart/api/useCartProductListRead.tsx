import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { CartItem } from "@/(FSD)/shareds/types/Cart.type";
import { useQuery } from "@tanstack/react-query";
import { CartItemsProps } from "../ui/CartProductList";

export const useCartProductListRead = () => {
    return useQuery<CartItemsProps[]>({
        queryKey: ["cart_product_list_read"],
        queryFn:  () => fetchData({ 
            path: "/cart",
            isAuthRequired: true, 
        }),
    });
};
