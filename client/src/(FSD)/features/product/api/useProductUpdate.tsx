import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";

const productUpdateFetch = async (data: any) => {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch("http://localhost:8090/api/product/update", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
             'Content-Type': 'application/json'
        },
        body:  JSON.stringify(data),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const responseData = await response.json();

    return responseData;
}

export const useProductUpdate = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (data: FormData) => {
            return productUpdateFetch(data);
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