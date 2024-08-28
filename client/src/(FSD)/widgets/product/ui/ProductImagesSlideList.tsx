"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductImagesSlideList = ({ productImages }: { productImages?: string[] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = productImages || [];
    
    // 빈 문자열이 아닌 유효한 이미지 배열을 생성
    const validImages = images.filter(image => image !== null);
    const imageCount = validImages.length;

    const sliderSettings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        afterChange: (current: number) => setCurrentSlide(current),
    };

    return (
        <div className={style.product_detail_slide_list}>
            <Slider {...sliderSettings}>
                {validImages.map((image, index) => (
                    <div className={style.slide_block} key={index}>
                        <img
                            src={image}
                            alt={`Product Image ${index + 1}`}
                            className={style.image}
                        />
                    </div>
                ))}
            </Slider>
            <div className={style.image_order}>
                <strong>{currentSlide + 1}</strong> <span style={{ margin: "0 4px" }}>/</span> {imageCount}
            </div>
        </div>
    );
};

export default ProductImagesSlideList;
