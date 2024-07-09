'use client'

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { priceState, productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import { ProductList } from "./ProductOrderBar";
import ProductPaymentBtn from "@/(FSD)/features/product/ui/ProductPaymentBtn";

const ProductOrderFooter = () => {

const productList = useRecoilValue<ProductList[]>(productsState)
    

console.log(productList);

    return (
     <div>
     <ProductPaymentBtn productList={productList}/>
     </div>
    );
};

export default ProductOrderFooter;