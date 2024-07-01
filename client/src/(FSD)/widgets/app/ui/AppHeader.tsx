import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LogoShared from "@/(FSD)/shareds/ui/LogoShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <AppContainer>
                <AppInner>
                    <div className={styles.header_inner}>
                        <div className={styles.header_left}>
                            <Button variant={"light"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"large"} iconType={"menu"} />} />
                        </div>
                        <div className={styles.header_logo}>
                            <LogoShared />
                        </div>
                        <div className={styles.header_right}>
                            <LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"medium"} iconType={"search"} />} />
                            <LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"medium"} iconType={"cart"} />} />
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppHeader;