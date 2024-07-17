import { MutationType } from "@/(FSD)/features/types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useMutation } from "@tanstack/react-query"

export const useReviewDelete = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (reviewId: number) => {
            return fetchData({ path: `/review/delete?reviewId=${reviewId}`, method: "DELETE", isAuthRequired: true });
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};