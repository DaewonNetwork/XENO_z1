import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

const ProductOrderBar = () => {
    return (
        <div className={styles.product_order_bar}>
            <AppContainer>
                <AppInner>
                    <div className={styles.order_inner}>
                        <div className={styles.order_like_btn}>
                            <ProductLikeBtn productId={1} isLike={false} isIndex={true} size={"md"} index={1} />
                        </div>
                        <div className={styles.order_btn}>
                            <Button color={"primary"} fullWidth radius={"sm"}>구매하기</Button>
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default ProductOrderBar;