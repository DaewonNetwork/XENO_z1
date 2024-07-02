import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextXLargeShared from "@/(FSD)/shareds/ui/TextXlargeShared";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss"


const ProductInfo = () => {
    return (
        <>
            <div className={styles.product_category}>상의 &gt; 반소매 티셔츠 (디스이즈네버댓)</div>
            <div className={styles.product_name_block}>
                <h2 className={styles.product_name}>
                    T-Logo Tee
                </h2>
            </div>
            <div className={styles.product_rating}>
                <p className={styles.product_star_avg}>4.5</p>
                <p className={styles.product_review_count}>후기 2000개</p>
            </div>
            <div className={styles.product_price_info}>
                <div className={styles.product_sale_price_info}>
                    <span className={styles.product_sale_price}>27,000원</span>
                    <div className={styles.product_sale_info}>
                        <span className={styles.product_sale_percent}>40%</span>
                        <span className={styles.product_sale}>SALE</span>
                    </div>
                </div>
                <span className={styles.product_original_price}>45,000원</span>
            </div>
        </>
    );
}

export default ProductInfo;
