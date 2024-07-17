"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { Checkbox } from "@nextui-org/checkbox";
import AppContainer from "@/(FSD)/widgets/app/ui/AppContainer";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";

const CartProductSelectBar = () => {
    return (
        <div className={styles.cart_product_select_bar}>
            <AppContainer>
                <AppInner>
                    <Checkbox defaultSelected>전체</Checkbox>
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default CartProductSelectBar;