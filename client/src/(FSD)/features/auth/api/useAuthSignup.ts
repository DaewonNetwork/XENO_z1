import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";

export const useAuthSignup = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (userData: UserType) => {
            return fetchData({ path: "/auth/signup", method: "POST", body: userData, isNotAuthRequired: true })
        },
        onSuccess: (data: UserType) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};