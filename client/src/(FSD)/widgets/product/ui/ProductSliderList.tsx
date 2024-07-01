"use client";

import React from "react";
import Slider from "react-slick";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import ProductSlideCard from "@/(FSD)/entities/product/ui/ProductSlideCard";

const ProductSliderList = ({ productList }: { productList: ProductType[] }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    return (
        <div className={styles.product_slider_list}>
            <Slider {...settings}>
                {
                    productList.map(product => (
                        <React.Fragment key={product.productId}>
                            <ProductSlideCard product={product} />
                        </React.Fragment>
                    ))
                }
            </Slider>
        </div>
    );
};

export default ProductSliderList;