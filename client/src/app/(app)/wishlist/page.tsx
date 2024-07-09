import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";
import styles from "@/(FSD)/shareds/styles/WishlistStyle.module.scss";
import ProductLikeList from "@/(FSD)/widgets/product/ui/ProductLikeList";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <div className={styles.container}>
                    <ProductLikeList />
                </div>
            </AppInner>
        </AppSection>
    );
};

export default Page;