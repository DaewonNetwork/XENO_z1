'use client'

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductOrderBarRead } from "@/(FSD)/entities/product/api/useProductOrderBarRead";
import ProductOrderBar, { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilState } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
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