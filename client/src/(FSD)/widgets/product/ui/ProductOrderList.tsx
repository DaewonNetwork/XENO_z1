'use client'

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductOrderBarRead } from "@/(FSD)/entities/product/api/useProductOrderBarRead";
import ProductOrderBar, { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { priceState, productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOrderInfoCard from "@/(FSD)/shareds/ui/ProductOrderInfoCard";



const ProductOrderList = () => {


    const [newProducts, setNewProducts] = useRecoilState<ProductList[]>(productsState)

    useEffect(() => {
        const storedProducts = localStorage.getItem('newProducts');
        if (storedProducts) {
            setNewProducts(JSON.parse(storedProducts));
        }
        // 페이지가 처음 로드될 때만 실행되도록 빈 배열을 dependency로 설정
    }, []);

    const setPrice = useSetRecoilState(priceState)

    
    console.log("나는오더리스트", newProducts);

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