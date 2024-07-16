"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import AppInner from "../../app/ui/AppInner";
import OrderPaymentBtn from "@/(FSD)/features/order/ui/OrderPaymentBtn";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";

const OrderBtnBar = () => {
    const productList = useRecoilValue<OrderProductInfoType[]>(productsState);

    return (
        <div className={styles.order_btn_bar}>
            <AppInner>
                <OrderPaymentBtn productList={productList} />
            </AppInner>
        </div>
    );
};

export default OrderBtnBar;