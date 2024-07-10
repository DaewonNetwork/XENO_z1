import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import classNames from "classnames/bind";

import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";


interface ProductCardListType {
    productList: ProductType[];
    column?: number;
    isRank?: boolean;
    parentRefetch?: any;
};

const cn = classNames.bind(styles);

const ProductCardList = ({ productList, column = 3, isRank = false, parentRefetch }: ProductCardListType) => {
    const productCardListClassNames = cn({
        "column_one": column === 1,
        "column_two": column === 2,
        "column_three": column === 3,
    });

    return (
        <div className={`${styles.product_card_list} ${productCardListClassNames}`}>
            {
                productList.map((product, index) => (
                    <React.Fragment key={product.productColorId}>
                        <ProductCard product={product} isRank={isRank} rank={index + 1} likeBtn={<ProductLikeBtn productColorId={product.productColorId} isLike={product.like} parentRefetch={parentRefetch}/>} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default ProductCardList;