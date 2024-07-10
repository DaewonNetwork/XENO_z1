import React from "react";
import type { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import { Skeleton } from "@nextui-org/skeleton";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

import { ProductOrderInfoType } from "../../../shareds/types/product/ProductOrderBar.type";

// Props 타입 정의
interface ProductOrderInfoCardProps {
    product: ProductOrderInfoType;
}

// 함수형 컴포넌트 정의
const ProductOrderInfoCard = ({ product }: ProductOrderInfoCardProps) => {


    console.log(product.image)
    return (
        <div className={styles.productCard}>
            <h2>{product.name} ({product.color})</h2>
            <h2>{product.price}</h2>

            <h2>{product.quantity}</h2>
            <h2>{product.size}</h2>
            <img
                src={`data:image/jpeg;base64,${product.image}`}


            />


        </div>
    );
};

export default ProductOrderInfoCard;
