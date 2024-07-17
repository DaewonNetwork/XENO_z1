import OrderPaymentBtn from "@/(FSD)/features/product/ui/OrderPaymentBtn";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";

const Page = () => {

    const product: ProductType = {
    // 임시용
    productColorId: 1,
    name: "티셔츠",
    brandName: "나이키",
    price: 30000,
    sale: true,
    priceSale: 10,
    productState: "C급",
    like: false,
    productImage: null,
    category: "상의",
    categorySub: "반팔"
    };

    return (
        <>
            <AppSection>
                {/* <OrderPaymentBtn product={product} /> */}
                asd
            </AppSection>
        </>
    );
};


export default Page;