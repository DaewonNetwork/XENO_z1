import React, { useState } from "react";
import Slider from "react-slick";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductImagesSlideList = ({ productImages }: { productImages?: Uint8Array[] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = productImages || [];

    const sliderSettings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        afterChange: (current: number)  => setCurrentSlide(current)
    };

    return (
        <div className={style.product_detail_slide_list}>
            <Slider {...sliderSettings}>
                {images.map((image, index) => (
                    <div className={style.slide_block} key={index} >
                        <img
                            src={`data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`}
                            alt={`Product Image ${index + 1}`}
                            className={style.image}
                        />
                        <div className={style.image_order}><strong>{index + 1}</strong> / {images.length}</div>

                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductImagesSlideList;
