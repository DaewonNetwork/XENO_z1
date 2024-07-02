import { useMutation } from "@tanstack/react-query";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { fetchData } from "@/(FSD)/shareds/fetch/fetchData";
import { MutationType } from "@/(FSD)/features/types/mutation.type";

export const useSellerAuthSignin = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (userData: UserType) => {
            return fetchData({ path: "/auth/signin/seller", method: "POST", body: userData, isNotAuthRequired: true })
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