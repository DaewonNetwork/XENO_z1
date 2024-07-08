import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cartId, updates }: { cartId: number; updates: any }) =>
            fetchData({ path: `/cart/${cartId}`, method: "PUT", body: updates, isAuthRequired: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart_items"] });
        },
    });
};