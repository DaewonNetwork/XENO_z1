'use client'

import React, { useEffect } from 'react';
import { useUserRead } from '@/(FSD)/entities/user/api/useUserRead';
import { UserType } from '@/(FSD)/shareds/types/User.type';
import { useOrderListRead } from '@/(FSD)/entities/orders/api/useOrderListRead';
import { OrderInfoType } from '@/(FSD)/shareds/types/orders/OrderInfo.Type';
import { useRecoilValue } from 'recoil';
import { userState } from '@/(FSD)/shareds/stores/UserAtom';
import OrderCard from '@/(FSD)/entities/orders/ui/OrderCard';


const OrderCardList = () => {


    const { data } = useOrderListRead();

    
    const orderList: OrderInfoType[] = data; 

    useEffect(() => {
        console.log(data);
        
    }, [orderList]);

    if(!orderList) return <></>






    
    return (
  
          <div >
            {
                orderList.map(order => (
                    <React.Fragment key={order.orderId}>
                        <OrderCard order={order} />
                    </React.Fragment>
                ))
            }
        
        </div>
       
    );
};

export default OrderCardList;
