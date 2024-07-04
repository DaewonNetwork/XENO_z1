"use client";

import React, { useCallback } from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useProductFirstImegesRead } from "../api/useProductFirstImegesRead";
import { useParams } from "next/navigation";

interface ProductImages {
    productColorId: number;          // 상품 색상 ID (숫자)
    productColorImage: Uint8Array;   // 상품 색상 이미지 (Uint8Array)
}

const RelatedColorProducts = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductFirstImegesRead(Number(productColorId));

    const productImages: ProductImages[] = data || [];



    return (
        <>
            <div className={style.different_color}>
                <div className={style.different_color_text_block}>
                    <h4 className={style.different_color_text}>다른 색상 상품도 있어요</h4>
                </div>
                <div className={style.different_color_images_block}>
                    {productImages.map((p, index) => (
                        <div key={index} className={style.different_color_images} style={{ cursor: 'pointer' }}>
                            <a href={`/products/${p.productColorId}`}>
                                <img
                                    src={`data:image/jpeg;base64,${p.productColorImage}`}
                                    alt={`상품 이미지 ${p.productColorId}`}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.block} />
        </>
    );
};

export default RelatedColorProducts;
