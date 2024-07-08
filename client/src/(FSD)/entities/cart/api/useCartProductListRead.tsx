import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { CartItem } from "@/(FSD)/shareds/types/Cart.type";
import { useQuery } from "@tanstack/react-query";

export const useCartProductListRead = () => {
    return useQuery<CartItem[]>({
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
