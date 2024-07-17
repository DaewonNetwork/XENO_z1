"use client";

import React from "react";
import { useUserRead } from "@/(FSD)/entities/user/api/useUserRead";
import { UserType } from "@/(FSD)/shareds/types/User.type";

const UserInfo = () => {
    const { data } = useUserRead();
    const userInfo: UserType = data;

    return (
        <div>
            {userInfo && (
                <>
                    {userInfo.name}님
                
                </>
            )}
        </div>
    );
};

export default UserInfo;