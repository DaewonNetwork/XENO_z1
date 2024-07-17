import React from "react";
import RootProvider from "@/(FSD)/apps/providers/RootProvider";
import "@/(FSD)/shareds/styles/globalStyle.scss";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "XENO | 제노",
}

const RootLayout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <html lang="ko" suppressHydrationWarning={true}>
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <body>
                <RootProvider>
                    <div className={`bg-content3 ${styles.root}`} suppressHydrationWarning={true}>
                        <div className={`bg-background ${styles.root_box}`}>
                            {children}
                        </div>
                    </div>
                </RootProvider>
            </body>
        </html>
    );
};

export default RootLayout;