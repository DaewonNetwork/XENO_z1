import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";

interface ProductCreateData {
    formData: FormData;
    index: number;
}

export interface ProductCreateResponse {
    responseData: any;
    index: number;
}

const productCreateFetch = async (data: ProductCreateData): Promise<ProductCreateResponse> => {
    const { formData, index } = data;
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch("http://localhost:8090/api/product/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const responseData = await response.json();

    return { responseData, index };
}

export const useProductCreate = ({ onSuccess, onError }: MutationType): UseMutationResult<ProductCreateResponse, Error, ProductCreateData> => {
    return useMutation({
        mutationFn: (data: ProductCreateData) => {
            return productCreateFetch(data);
        },
        onSuccess: (data: ProductCreateResponse) => {
            onSuccess(data.index);
        },
        onError: (error: Error) => {
            if (onError) {
                onError();
            }
        }
    });
};
