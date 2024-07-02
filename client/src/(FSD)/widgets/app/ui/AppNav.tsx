"use client";

import React from "react";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <AppContainer>
                <AppInner>
                    <div className={styles.nav_inner}>
                        <LinkBtnShared href={"/"}>
                            <IconShared iconType={"menu"} />
                            <TextXSmallShared> 카테고리</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/"}>
                            <IconShared iconType={"review"} />
                            <TextXSmallShared>리뷰</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/"}>
                            <IconShared iconType={"home"} />
                            <TextXSmallShared>홈</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/"}>
                            <IconShared iconType={"like"} />
                            <TextXSmallShared>좋아요</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/"}>
                            <IconShared iconType={"person"} />
                            <TextXSmallShared>마이</TextXSmallShared>
                        </LinkBtnShared>
                    </div>
                </AppInner>
            </AppContainer>

        </nav >
    );
};

export default AppNav;