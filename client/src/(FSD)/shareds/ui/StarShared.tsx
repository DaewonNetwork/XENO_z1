import React from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import IconShared from "./IconShared";

const StarShared = ({ isActive = true }: { isActive?: boolean }) => {
    return (
        <div data-slot={"star"} className={`${styles.star} ${isActive ? styles.active_star : ""}`}>
            <IconShared iconType={"star"} />
        </div>
    );
};

export default StarShared;