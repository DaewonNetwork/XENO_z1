import React from "react";
import StarShared from "./StarShared";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

const StarListShared = ({ star }: { star: number }) => {
    const starList = Array.from({ length: 5 }, (_, i) => i < star);

    return (
        <div className={styles.star_list}>
            {
                starList.map((star, index) => (
                    <React.Fragment key={index}>
                        <StarShared isActive={star} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default StarListShared;