'use client'

import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { useParams } from "next/navigation";
import { useProductOrderBarRead } from "@/(FSD)/entities/product/api/useProductOrderBarRead";

interface sizeOrStockType {
    size: string;
    stock: number;
}

interface ProductOrderBarType {
    productColorId: number;
    like?: boolean;
    likeIndex?: number;
    color: string[]
    sizeOrStock: sizeOrStockType[]
}

const ProductOrderBar = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductOrderBarRead(Number(productColorId));
    
    const orderBar:ProductOrderBarType = data;

    console.log(orderBar)

    return (
        <div className={styles.product_order_bar}>
            <AppContainer>
                <AppInner>
                    <div className={styles.order_inner}>
                        <div className={styles.order_like_btn}>
                            <ProductLikeBtn productColorId={Number(productColorId)} isLike={orderBar.like} isIndex={true} size={"md"} index={orderBar.likeIndex} />
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