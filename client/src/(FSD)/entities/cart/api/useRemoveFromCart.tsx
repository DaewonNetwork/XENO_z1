import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            fetchData({ 
                path: "/cart", 
                method: "DELETE", 
                isAuthRequired: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart_items"] });
        },
    });
};