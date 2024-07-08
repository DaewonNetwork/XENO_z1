"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";
import Slider from "react-slick";
import { Skeleton } from "@nextui-org/skeleton";

const MainBanner = () => {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    return (
        <div className={`${styles.content} ${styles.banner}`}>
            <Slider {...settings}>
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <React.Fragment key={index}>
                            <Skeleton className={styles.banner_skeleton} />
                        </React.Fragment>
                    ))
                }
            </Slider>
        </div>
    );
};

export default MainBanner;