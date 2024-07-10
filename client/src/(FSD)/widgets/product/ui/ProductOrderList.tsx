'use client'

import React, { useEffect } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOrderInfoCard from "@/(FSD)/entities/product/ui/ProductOrderInfoCard";
import { ProductOrderInfoType } from "@/(FSD)/shareds/types/product/ProductOrderBar.type";





const ProductOrderList = () => {


    const [newProducts, setNewProducts] = useRecoilState<ProductOrderInfoType[]>(productsState)
    useEffect(() => {

        const storedProducts = localStorage.getItem('newProducts');
        if (storedProducts) {
            setNewProducts(JSON.parse(storedProducts));
        }
    }, []);



    return (
        <>
            {
                newProducts.map((product, index) => (
                    <div key={index}>
                        <ProductOrderInfoCard product={product} />
                    </div>
                ))
            }
        </>
    );
};

export default ProductOrderList;