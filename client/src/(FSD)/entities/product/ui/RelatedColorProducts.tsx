"use client";



import React, { useCallback, useEffect, useState } from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useProductFirstImegesRead } from "../api/useProductFirstImegesRead";

interface otherColorProps {
    productColorImages: Uint8Array[]
    otherProductColorId: number[]
}

const RelatedColorProducts = ({ productColorImages,otherProductColorId}:otherColorProps) => {

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderSettings = {
        dots: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: false,
        infinite: false,
        afterChange: (current: number) => setCurrentSlide(current),
    };

    const images = productColorImages || [];

    const handleFirstImageClick = useCallback(() => {
        window.location.reload(); // 현재 창을 새로 고침합니다.
    }, []);

    if (!images) return <></>;

    

    return (
        <>
            <div className={style.different_color}>
                <div className={style.different_color_text_block}>
                    <h4 className={style.different_color_text}>다른 색상 상품도 있어요</h4>
                </div>
                <div className={style.different_color_images_block}>
                    {images.map((image, index) => (
                        <div key={index} className={style.different_color_images} onClick={index === 0 ? handleFirstImageClick : undefined} style={{ cursor: 'pointer' }}>
                            <img
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`제품 이미지 ${index + 1}`}
                            />
                        
                        </div>
                    ))}

                </div>
            </div>
            <div className={style.block} />
        </>
    );
};

export default RelatedColorProducts;