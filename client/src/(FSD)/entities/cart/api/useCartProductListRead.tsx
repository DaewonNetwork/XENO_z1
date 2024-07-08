"use client"

import { useQuery } from "@tanstack/react-query";
import { CartItemsProps } from "../ui/CartProductList";
import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";


export const useCartProductListRead = () => {
    
  return useQuery<CartItemsProps[]>({
    queryKey: ["cart_product_list_read"],
    queryFn: () => fetchData({ 
      path: "/cart",
      isAuthRequired: true, 
    }),
  });
};
