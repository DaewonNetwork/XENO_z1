import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // mutationFn: ({ updates }: { updates: any }) =>
        mutationFn: (updates: { quantity: number; isSelected: boolean; price: number; }) =>
            fetchData({ 
                path: "/cart", 
                method: "PUT", 
                body: updates, 
                isAuthRequired: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart_items"] });
        },
    });
};