
import { CartItem } from "@/(FSD)/shareds/types/Cart.type";
import { useQuery } from "@tanstack/react-query";
import { CartItemsProps } from "../ui/CartProductList";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useCartProductListRead = () => {
    const fetchData = useFetchData();
    
    return useQuery<CartItemsProps[]>({
        queryKey: ["cart_product_list_read"],
        // 서버에서 controller를 지정해주고 path를 넣어줘야 함.
        // isAuthRequired는 로그인 여부
        // http://localhost:8090/api/cart?userid={}
        queryFn:  () => fetchData({ 
            path: "/cart",
            isAuthRequired: true, 
        }),
    });
};
