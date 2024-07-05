'use client'

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

import { orderInfoType, ProductOrderBarType } from "@/(FSD)/features/product/ui/ProductOrderContainer";


interface likeType {
    isLike?: boolean;
    likeIndex?: number
}


const ProductOrderBtnBar = ({ isLike, likeIndex }: likeType) => {



    return (
        <div className={styles.product_order_bar}>
            <AppContainer>
                <AppInner>
                    <div className={styles.order_inner}>
                        <div className={styles.order_like_btn}>
                            <ProductLikeBtn isLike={isLike} isIndex={true} size={"md"} index={likeIndex} />
                        </div>
                        <div className={styles.order_btn}>
                            <Button color="primary" fullWidth radius="sm">
                                구매하기
                            </Button>
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default ProductOrderBtnBar;