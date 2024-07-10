"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useProductFirstImegesRead } from "../../../entities/product/api/useProductFirstImegesRead";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import { useSetRecoilState } from "recoil";
import { imageState } from "@/(FSD)/shareds/stores/ProductAtom";

export interface ProductImages {
    productColorId: number;          // 상품 색상 ID (숫자)
    productColorImage: Uint8Array;   // 상품 색상 이미지 (Uint8Array)
}

const ProductOtherColorImageList = () => {
    const { productColorId } = useParams<{ productColorId: string }>();
    const { data, isError, error, isPending, refetch } = useProductFirstImegesRead(Number(productColorId));

    const productImages: ProductImages[] = data || [];

    const setImages = useSetRecoilState(imageState);

    useEffect(() => {
        if (productImages) {
            // productImages를 Recoil의 imageState에 설정
            setImages(productImages);
        }
    }, [productImages, setImages]);

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderSettings = {
        dots: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: false,
        infinite: false,
        afterChange: (current: number) => setCurrentSlide(current),
    };
    const totalImages = useMemo(() => productImages.filter(p => p.productColorImage).length, [productImages]);
    const shouldEnableSlider = totalImages >= 3;


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

export default ProductOtherColorImageList;
