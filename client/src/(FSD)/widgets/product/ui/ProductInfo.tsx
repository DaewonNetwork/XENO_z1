import React from "react";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { getCategoryID, getCategorySubId } from "@/(FSD)/entities/product/utill/categoryUtils";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { categoryIdState, categorySubIdState } from "@/(FSD)/shareds/stores/CategoryAtom";

const ProductInfo = ({ product }: { product: ProductInfoType }) => {
    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    console.log(product)

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    const categoryId = getCategoryID(product.category);
    const categorySubId = getCategorySubId(product.categorySub);


    const router = useRouter();

    const setCategoryId = useSetRecoilState(categoryIdState);
    const setCategorySubId = useSetRecoilState(categorySubIdState);

    const handleCategoryClick = () => {
        router.push(`/menu`)
        setCategoryId(categoryId)
    };

    const handleSubCategoryClick = () => {
        router.push(`/menu`)
        setCategoryId(categoryId)
        setCategorySubId(categorySubId)
    };


    return (
        <>
            <div className={styles.product_category}>
                <span onClick={handleCategoryClick} style={{ cursor: "pointer" }} >
                    {product.category}
                </span>
                &nbsp;&gt;&nbsp;
                <span onClick={handleSubCategoryClick} style={{ cursor: "pointer" }}>
                    {product.categorySub}
                </span>
                &nbsp;({product.brandName})
            </div>
            <div className={styles.product_name_block}>
                <h2 className={styles.product_name}>
                    {product.booleanColor ? `${product.name} (${product.color})` : `${product.name}`}
                </h2>
            </div>
            <div className={styles.product_rating}>
                <div className={styles.product_star}></div>
                <p className={styles.product_star_avg}>{product.starAvg}</p>
                <p className={styles.product_review_count}>후기 {product.reviewIndex}개</p>
            </div>
            <div className={styles.product_price_info}>
                {product.sale ? (
                    <>
                        <div className={styles.product_sale_price_info}>
                            <span className={styles.product_sale_price}>{product.priceSale?.toLocaleString()}원</span>
                            <div className={styles.product_sale_info}>
                                <span className={styles.product_sale_percent}>{discountPercent}%</span>
                                <span className={styles.product_sale}>SALE</span>
                            </div>
                        </div>
                        <span className={styles.product_original_price}>{product.price?.toLocaleString()}원</span>
                    </>
                ) : (
                    <div className={styles.product_sale_price_info}>
                        <span className={styles.product_sale_price}>{product.price?.toLocaleString()}원</span>
                    </div>
                )}
            </div>
            <div className={styles.block}></div>
        </>
    );
};

export default ProductInfo;
