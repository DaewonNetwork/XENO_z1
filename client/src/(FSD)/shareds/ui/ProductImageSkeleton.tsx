// ProductImageSkeleton.tsx

import React from "react";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductImageSkeleton = () => {
  return (
    <div className={style.slide_block}>
      <div className={style.skeleton_image}></div>
    </div>
  );
};

export default ProductImageSkeleton;
