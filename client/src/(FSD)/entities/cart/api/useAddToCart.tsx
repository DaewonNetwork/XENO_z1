
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newItem: { userId: number; productColorSizeId: number; productImageId: number; quantity: number }) =>
            fetchData({ 
                path: "/cart", 
                method: "POST", 
                body: newItem, 
                isAuthRequired: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart_items"] });
        },
    });
};