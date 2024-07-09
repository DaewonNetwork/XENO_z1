"use client";

import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useUserRead } from "@/(FSD)/entities/user/api/useUserRead";
import { useEffect } from "react";
import { userState } from "../stores/UserAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useAuthStatus = () => {
    const { data, isError, isPending, refetch } = useUserRead();

    const set = useSetRecoilState(userState);

    const user: UserType = data;

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (user && accessToken && refreshToken) {
            set(userData => {
                const newData = { ...userData };
                newData.user = user;
                newData.isLoggedIn = true;
                newData.accessToken = accessToken;
                newData.refreshToken = refreshToken;
                return newData;
            });
        } else {
            set(userData => {
                const newData = { ...userData };
                newData.user = null;
                newData.isLoggedIn = false;
                newData.accessToken = "";
                newData.refreshToken = "";
                return newData;
            });
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    }, [isError]);

    useEffect(() => {
        refetch();
    }, [localStorage.getItem("access_token")]);

    return { isPending };
};

export default useAuthStatus;