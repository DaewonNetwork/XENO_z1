
import { CartItem } from "@/(FSD)/shareds/types/Cart.type";
import { useQuery } from "@tanstack/react-query";
import { CartItemsProps } from "../ui/CartProductList";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useCartProductListRead = () => {
    const fetchData = useFetchData();
    
    return useQuery<CartItemsProps[]>({
        queryKey: ["cart_product_list_read"],
        queryFn:  () => fetchData({ 
            path: "/cart",
            isAuthRequired: true, 
        }),
    });
};
