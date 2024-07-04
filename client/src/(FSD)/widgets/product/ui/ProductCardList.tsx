import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import classNames from "classnames/bind";
import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

interface ProductCardListType {
    productList: ProductType[];
    columns?: number;
};

const cn = classNames.bind(styles);

const ProductCardList = ({ productList, columns = 3 }: ProductCardListType) => {
    const productCardListClassNames = cn({
        "columns_one": columns === 1,
        "columns_two": columns === 2,
        "columns_three": columns === 3,
    });

    return (
        <div className={`${styles.product_card_list} ${productCardListClassNames}`}>
            {
                productList.map((prodcut) => (
                    <React.Fragment key={prodcut.productId}>
                        <ProductCard product={prodcut} linkBtn={<ProductLikeBtn productId={prodcut.productId} isLike={prodcut.isLike} />} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default ProductCardList;