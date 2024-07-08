import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartId: number) =>
            fetchData({ path: `/cart/${cartId}`, method: "DELETE", isAuthRequired: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart_items"] });
        },
    });
};