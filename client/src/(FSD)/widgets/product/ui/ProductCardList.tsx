import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import classNames from "classnames/bind";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

interface ProductCardListType {
    productList: ProductType[];
    column?: number;
    isRank?: boolean;
};

const cn = classNames.bind(styles);

const ProductCardList = ({ productList, column = 3, isRank = false }: ProductCardListType) => {
    const productCardListClassNames = cn({
        "column_one": column === 1,
        "column_two": column === 2,
        "column_three": column === 3,
    });

    return (
        <div className={`${styles.product_card_list} ${productCardListClassNames}`}>
            {
                productList.map((prodcut, index) => (
                    <React.Fragment key={prodcut.productId}>
                        <ProductCard product={prodcut} isRank={isRank} rank={index + 1} linkBtn={<ProductLikeBtn productId={prodcut.productId} isLike={prodcut.isLike} />} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default ProductCardList;