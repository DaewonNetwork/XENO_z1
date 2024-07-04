"use client";

import React, { useCallback, useState } from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useProductFirstImegesRead } from "../api/useProductFirstImegesRead";
import { useParams } from "next/navigation";
import Slider from "react-slick";

interface ProductImages {
    productColorId: number;          // 상품 색상 ID (숫자)
    productColorImage: Uint8Array;   // 상품 색상 이미지 (Uint8Array)
}

const RelatedColorProducts = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductFirstImegesRead(Number(productColorId));

    const productImages: ProductImages[] = data || [];

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderSettings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        afterChange: (current: number) => setCurrentSlide(current),
    };
    const shouldEnableSlider = productImages.length >= 3;

    return (
        <>
            <div className={style.different_color}>
                <div className={style.different_color_text_block}>
                    <h4 className={style.different_color_text}>다른 색상 상품도 있어요</h4>
                </div>

                {shouldEnableSlider ? (<div className={style.product_detail_slide_list}>
                    <Slider {...sliderSettings}>
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
                    </Slider>
                </div>
                ) : (
                    // Slider를 사용하지 않고 이미지를 그대로 표시
                    productImages.map((p, index) => (
                        <div key={index} className={style.different_color_images} style={{ cursor: 'pointer' }}>
                            <a href={`/products/${p.productColorId}`}>
                                <img
                                    src={`data:image/jpeg;base64,${p.productColorImage}`}
                                    alt={`상품 이미지 ${p.productColorId}`}
                                />
                            </a>
                        </div>
                    ))
                )}
            </div>
      
            <div className={style.block} />
        </>
    );
};

export default RelatedColorProducts;
