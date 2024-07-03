import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextXLargeShared from "@/(FSD)/shareds/ui/TextXlargeShared";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss"
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";


const ProductInfo = ({ product }: { product: ProductInfoType }) => {
    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    return (
        <>
            <div className={styles.product_category}>{product.category} &gt; {product.categorySub} ({product.brandName})</div>
            <div className={styles.product_name_block}>
                <h2 className={styles.product_name}>
                    {product.name}
                </h2>
            </div>
            <div className={styles.product_rating}>
                <div className={styles.product_star_img}>
                    
                </div>
                <p className={styles.product_star_avg}>{product.starAvg}</p>
                <p className={styles.product_review_count}>후기 {product.reviewIndex}개</p>
            </div>
            <div className={styles.product_price_info}>
                {product.sale ? (
                    <>
                    <div className={styles.product_sale_price_info}>
                        <span className={styles.product_sale_price}>{product.priceSale.toLocaleString()}원</span>
                        <div className={styles.product_sale_info}>
                            <span className={styles.product_sale_percent}>{discountPercent}%</span>
                            <span className={styles.product_sale}>SALE</span>
                        </div>
                        
                    </div>
                    <span className={styles.product_original_price}>{product.price.toLocaleString()}원</span>
                    </>
                ) : (
                    <div className={styles.product_sale_price_info}>
                    <span className={styles.product_sale_price}>{product.price.toLocaleString()}원</span>
                    </div>
                )}
            </div>
            <div className={styles.block}/>
        </>
    );
}

export default ProductInfo;
