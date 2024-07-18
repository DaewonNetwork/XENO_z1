import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppInner from "../../app/ui/AppInner";
import OrderPaymentBtn from "@/(FSD)/features/order/ui/OrderPaymentBtn";

const CartBtnBar = () => {
    return (
        <div className={styles.cart_btn_bar}>
            <AppInner>
                s
                {/* <OrderPaymentBtn /> */}
            </AppInner>
        </div>
    );
};

export default CartBtnBar;