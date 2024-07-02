'use client'

import React, { useState } from "react";
import Slider from "react-slick";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductDetailImagesList = ({ productDetailImages }: { productDetailImages?: Uint8Array[] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = productDetailImages || [];

    return (
        <div className={style.product_detail_slide_list}>
          
                {images.map((image, index) => (
                    <div className={style.slide_block} key={index}>
                        <img
                            src={`data:image/jpeg;base64,${image}`}
                            alt={`Product Image ${index + 1}`}
                            className={style.image}
                        />
                    </div>
                ))}
           
            <div className={style.image_order}>
                <strong>{currentSlide + 1}</strong> <span style={{ margin: "0 4px" }}>/</span> {images.length}
            </div>
        </div>
    );
};

export default ProductDetailImagesList;
