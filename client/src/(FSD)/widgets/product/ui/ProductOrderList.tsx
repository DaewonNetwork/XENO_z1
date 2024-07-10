'use client'

import React, { useEffect } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOrderInfoCard from "@/(FSD)/entities/product/ui/ProductOrderInfoCard";
import { ProductOrderInfoType } from "@/(FSD)/shareds/types/product/ProductOrderBar.type";
import { useRouter } from "next/navigation";






const ProductOrderList = () => {


    const [newProducts, setNewProducts] = useRecoilState<ProductOrderInfoType[]>(productsState)

    const router = useRouter();
    useEffect(() => {

        const storedProducts = localStorage.getItem('newProducts');
        if (storedProducts) {
            setNewProducts(JSON.parse(storedProducts));
        } else {
            alert('잘못된 접근입니다.')
            router.push("http://localhost:3000/")
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