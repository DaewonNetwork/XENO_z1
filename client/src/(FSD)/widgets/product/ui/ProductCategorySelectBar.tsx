"use client";

import React, { MouseEvent, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/MenuStyle.module.scss";
import { Chip } from "@nextui-org/chip";

const ProductCategorySelectBar = () => {

    return (
        <div className={styles.product_category_select_bar}>
            <Chip>전체</Chip>
            <Chip>상의</Chip>
            <Chip>반팔</Chip>
            <Chip>긴팔</Chip>
            <Chip>하의</Chip>
            <Chip>청바지</Chip>
            <Chip>반바지</Chip>
            <Chip>면바지</Chip>
            <Chip>나일론</Chip>
            <Chip>아우터</Chip>
            <Chip>후드집업</Chip>
            <Chip>코트</Chip>
            <Chip>바람막이</Chip>
            <Chip>패딩</Chip>
            <Chip>자켓</Chip>
        </div>
    );
};

export default ProductCategorySelectBar;