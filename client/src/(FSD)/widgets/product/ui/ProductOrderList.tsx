    'use client'

    import React, { useEffect } from "react";
    import { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
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