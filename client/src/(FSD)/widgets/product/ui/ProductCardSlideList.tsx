"use client";

import ProductCard from "@/(FSD)/entities/product/ui/ProductCard";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import React from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import Slider from "react-slick";

interface ProductCardSlideListType {
    productList: ProductType[];
    isRank?: boolean;
}

const ProductCardSlideList = ({ productList, isRank = false }: ProductCardSlideListType) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
    };

    return (
        <div className={style.product_card_slide_list}>
            <Slider {...settings}>
                {
                    productList.map((product, index) => (
                        <React.Fragment key={product.productColorId}>
                            <ProductCard product={product} linkBtn={<ProductLikeBtn isLike={product.like} productColorId={product.productColorId} />} isRank={isRank} rank={index + 1} />
                        </React.Fragment>
                    ))
                }
            </Slider>
        </div>
    )
}

export default ProductCardSlideList;