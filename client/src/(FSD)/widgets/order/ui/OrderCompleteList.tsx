"use client";

import React, { useEffect, useReducer } from "react";
import { useRecoilState } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import { useRouter } from "next/navigation";
import OrderProductInfo from "@/(FSD)/entities/order/ui/OrderProductInfo";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppInner from "../../app/ui/AppInner";

const OrderCompleteList = () => {
    const [isOpen, handleOpen] = useReducer((state) => !state, true);
    const [newProducts, setNewProducts] = useRecoilState<OrderProductInfoType[]>(productsState);

    const router = useRouter();
    useEffect(() => {
        const storedProducts = localStorage.getItem("newProducts");

        console.log(storedProducts)
        if (storedProducts) {
            setNewProducts(JSON.parse(storedProducts));
        } else {
            alert("잘못된 접근입니다.");
            router.push("/");
        }
    }, []);

    return (
        <div className={`bg-background ${styles.order_product_info_list}`}>
            <AppInner>
                <div className={styles.list_header}>
                    <TextLargeShared>상품 정보</TextLargeShared>
                    <Button onClick={handleOpen} size={"sm"} isIconOnly variant={"light"}><IconShared iconType={isOpen ? "top" : "bottom"} /></Button>
                </div>
                <div className={styles.list_body} style={{ display: isOpen ? "block" : "none" }}>
                    {
                        newProducts.map((product) => (
                            <React.Fragment key={product.productColorSizeId}>
                                <OrderProductInfo product={product} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </AppInner>
        </div>
    );
};

export default OrderCompleteList;