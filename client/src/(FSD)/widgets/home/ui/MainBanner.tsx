"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";
import Slider from "react-slick";
import { Skeleton } from "@nextui-org/skeleton";
import banner from "../../../../../asd.gif"

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
           <img src={banner.src}  className={styles.bannerImage} />
        </div>
    );
};

export default MainBanner;