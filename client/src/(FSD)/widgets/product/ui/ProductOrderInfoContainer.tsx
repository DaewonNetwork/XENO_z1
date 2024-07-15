'use client'

import React, { useEffect } from "react";
import ProductOrderList from "./ProductOrderList";
import ProductOrderUserInfo from "./ProductOrderUserInfo";



const ProductOrderInfoContainer = () => {


    return (
      <>
      <ProductOrderUserInfo/>
      <ProductOrderList/>
      
      </>
    );
};

export default ProductOrderInfoContainer;