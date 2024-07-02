import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "@/(FSD)/widgets/app/ui/AppContainer";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import BackBtnShared from "@/(FSD)/shareds/ui/BackBtnShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const ProductHeader = () => {
    return (
        <header className={styles.product_header}>
            <AppContainer>
                <AppInner>
                    <div className={styles.header_inner}>
                        <div className={styles.back_btn}>
                            <BackBtnShared />
                        </div>
                        <div className={styles.left_btns}>
                            <LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconType={"home"} />} />
                            <LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconType={"search"} />} />
                            <LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconType={"cart"} />} />
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default ProductHeader;