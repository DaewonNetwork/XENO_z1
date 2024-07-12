'use client'

import React from 'react';
import { useUserRead } from '@/(FSD)/entities/user/api/useUserRead';
import { UserType } from '@/(FSD)/shareds/types/User.type';

const UserInfo = () => {
    const { data } = useUserRead();
    const userInfo: UserType = data; // UserType에 맞게 data를 userInfo로 타입 단언

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
