'use client'

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { priceState, productsState } from "@/(FSD)/shareds/stores/ProductAtom";

import ProductPaymentBtn from "@/(FSD)/features/product/ui/ProductPaymentBtn";
import { ProductOrderInfoType } from "@/(FSD)/shareds/types/product/ProductOrderBar.type";



const ProductOrderFooter = () => {

const productList = useRecoilValue<ProductOrderInfoType[]>(productsState)
    

console.log(productList);

    return (
     <div>
     <ProductPaymentBtn productList={productList}/>
     </div>
    );
};

export default ProductOrderFooter;