import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const ItemShared = ({ children }: { children: ReactNode }) => {
    return (
        <div
            data-slot={"item"}
            className={`${styles.item}`}
            onMouseOver={e => { e.currentTarget.classList.add("bg-content2"); }}
            onMouseOut={e => { e.currentTarget.classList.remove("bg-content2"); }}
        >
            {children}
        </div>
    )
}

export default ItemShared;