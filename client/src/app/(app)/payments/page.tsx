"use client";

import PaymentButton from "@/(FSD)/features/product/ui/ProductPaymentBtn";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {

    const product: ProductType = {
    // 임시용
    productId: 1,
    productName: "티셔츠",
    productBrand: "나이키",
    price: 30000,
    isSale: true,
    sale: 10,
    productState: "C급",
    isLike: false,
    productImage: null,
    productCategory: "상의",
    productSubCategory: "반팔"
    };

    return (
        <>
            <AppSection>
                <PaymentButton product={product}/>
            </AppSection>
        </>
    );
};


export default Page;