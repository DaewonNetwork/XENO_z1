"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/MenuStyle.module.scss";
import { Chip } from "@nextui-org/chip";
import { useRecoilState } from "recoil";
import { categoryIdState, categorySubIdState } from "@/(FSD)/shareds/stores/CategoryAtom";

const ProductCategorySelectBar = () => {
    const [categoryId, setCategoryId] = useRecoilState(categoryIdState);
    const [categorySubId, setCategorySubId] = useRecoilState(categorySubIdState);

    const updateCategoryId = (id: string) => {
        setCategoryId(id)
        setCategorySubId('');
        console.log(categoryId)
        console.log("서브"+categorySubId)
    }

    const updateCategorySubId = (id: string) => {
        setCategorySubId(id)
        console.log(categoryId)
        console.log(categorySubId)
    }


    return (
        <div >
            <div className={styles.product_category_select_bar}>
                <Chip onClick={() => updateCategoryId('000')}>전체</Chip>
                <Chip onClick={() => updateCategoryId('001')}>상의</Chip>
                <Chip onClick={() => updateCategoryId('002')}>하의</Chip>
                <Chip onClick={() => updateCategoryId('003')}>아우터</Chip>
            </div>
            <div className={styles.product_category_select_bar}>
                {categoryId === '001' && (
                    <>
                        <Chip onClick={() => updateCategoryId('001')}>전체</Chip>
                        <Chip onClick={() => updateCategorySubId('001')}>반팔</Chip>
                        <Chip onClick={() => updateCategorySubId('002')}>긴팔</Chip>
                    </>
                )}
                {categoryId === '002' && (
                    <>
                        <Chip onClick={() => updateCategoryId('002')}>전체</Chip>
                        <Chip onClick={() => updateCategorySubId('003')}>청바지</Chip>
                        <Chip onClick={() => updateCategorySubId('004')}>반바지</Chip>
                        <Chip onClick={() => updateCategorySubId('005')}>면바지</Chip>
                        <Chip onClick={() => updateCategorySubId('006')}>나일론</Chip>
                    </>
                )}
                {categoryId === '003' && (
                    <>
                        <Chip onClick={() => updateCategoryId('003')}>전체</Chip>
                        <Chip onClick={() => updateCategorySubId('007')}>후드집업</Chip>
                        <Chip onClick={() => updateCategorySubId('008')}>코트</Chip>
                        <Chip onClick={() => updateCategorySubId('009')}>바람막이</Chip>
                        <Chip onClick={() => updateCategorySubId('0010')}>패딩</Chip>
                        <Chip onClick={() => updateCategorySubId('0011')}>자켓</Chip>
                    </>
                )}
            </div>



        </div>
    );
};

export default ProductCategorySelectBar;