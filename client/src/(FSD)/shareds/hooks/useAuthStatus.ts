"use client";

import { useEffect } from "react";
import { isLoggedInState } from "../stores/UserAtom";
import { useSetRecoilState } from "recoil";
import { useTokenRead } from "@/(FSD)/entities/auth/api/useTokenRead";

const useAuthStatus = () => {
    const { data, isError, isPending, error, refetch } = useTokenRead();

    const set = useSetRecoilState(isLoggedInState);

    const isLoggedIn: boolean = !!data;

    useEffect(() => {
        if(isLoggedIn) {
            set(true);
        } else {
            set(false);
        }
    }, [data]);

    useEffect(() => {
        console.log(error);
        console.log(isError);
        
        
        // if (isError) {
        //     localStorage.removeItem("access_token");
        //     localStorage.removeItem("refresh_token");
        // }
    }, [isError]);

    useEffect(() => {
        refetch();
    }, [localStorage.getItem("access_token")]);

    return { data, isPending };
};

export default useAuthStatus;