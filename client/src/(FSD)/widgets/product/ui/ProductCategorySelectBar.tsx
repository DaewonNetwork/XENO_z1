"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/MenuStyle.module.scss";
import { Chip } from "@nextui-org/chip";
import { useRecoilState } from "recoil";
import { categoryIdState, categorySubIdState } from "@/(FSD)/shareds/stores/CategoryAtom";
import { categories } from "../consts/categories";

const ProductCategorySelectBar = () => {
    const [categoryId, setCategoryId] = useRecoilState(categoryIdState);
    const [categorySubId, setCategorySubId] = useRecoilState(categorySubIdState);

    const updateCategoryId = (id: string) => {
        setCategoryId(id);
        setCategorySubId("");
    };

    const updateCategorySubId = (id: string) => {
        setCategorySubId(id);
    };

    return (
        <div>
            <div className={styles.product_category_select_bar}>
                {categories.map(category => (
                    <Chip
                        key={category.id}
                        className={categoryId === category.id ? styles.selected : ""}
                        onClick={() => updateCategoryId(category.id)}
                    >
                        {category.label}
                    </Chip>
                ))}
            </div>
            <div className={styles.product_category_select_bar}>
                {categories.find(category => category.id === categoryId)?.subCategories?.map(subCategory => (
                    <Chip
                        key={subCategory.id}
                        className={categorySubId === subCategory.id ? styles.selected : ""}
                        onClick={() => updateCategorySubId(subCategory.id)}
                    >
                        {subCategory.label}
                    </Chip>
                ))}
            </div>
        </div>
    );
};

export default ProductCategorySelectBar;

