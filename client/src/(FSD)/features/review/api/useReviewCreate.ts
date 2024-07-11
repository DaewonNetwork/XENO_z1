import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useReviewCreate = ({ onSuccess, onError }: MutationType) => {

const fetchData = useFetchData();

    return useMutation({
        mutationFn: (data: FormData) => {
            return fetchData({ path: "/review", method: "POST", body: data,contentType: "multipart/form-data", isAuthRequired: true,});
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