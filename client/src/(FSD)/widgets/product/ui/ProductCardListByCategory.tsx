'use client'

import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import classNames from "classnames/bind";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

import { categoryIdState, categorySubIdState } from "@/(FSD)/shareds/stores/CategoryAtom";
import { useProductReadByCategory } from "@/(FSD)/entities/product/api/useProductReadByCategory";
import { useRecoilValue } from "recoil";
import ProductCardSkeletonShared from "@/(FSD)/shareds/ui/ProductCardSkeletonShared";


interface ProductCardListType {
    column?: number;
    isRank?: boolean;
};

const cn = classNames.bind(styles);

const ProductCardListByCategory = ({column = 3, isRank = false }: ProductCardListType) => {
    const productCardListClassNames = cn({
        "column_one": column === 1,
        "column_two": column === 2,
        "column_three": column === 3,
    });

    const categoryId = useRecoilValue(categoryIdState);
    const categorySubId = useRecoilValue(categorySubIdState);


    const { data, isLoading, refetch } = useProductReadByCategory(categoryId, categorySubId);

    const productList: ProductType[] = data;

    console.log(productList)

    if (isLoading) {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} style={{ flex: '0 0 calc(25% - 10px)', marginRight: index % 2 === 0 ? '15px' : '0', marginBottom: '10px' }}>
                        <ProductCardSkeletonShared />
                    </div>
                ))}
            </div>
        );
    }
    
    
    

    // 데이터가 없는 경우 빈 화면을 반환
    if (!productList || productList.length === 0) return <></>;
   

    return (
        <div className={`${styles.product_card_list} ${productCardListClassNames}`}>
            {
                productList.map((product, index) => (
                    <React.Fragment key={product.productColorId}>
                        <ProductCard product={product} isRank={isRank}
                        rank={index + 1} linkBtn={<ProductLikeBtn  productColorId={product.productColorId} isLike={product.like} parentRefetch={refetch}/>} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default ProductCardListByCategory;