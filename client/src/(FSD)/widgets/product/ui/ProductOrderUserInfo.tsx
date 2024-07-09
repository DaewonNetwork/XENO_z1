

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductOrderBarRead } from "@/(FSD)/entities/product/api/useProductOrderBarRead";
import ProductOrderBar, { ProductList } from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useRecoilState } from "recoil";
import { productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOrderList from "./ProductOrderList";



const ProductOrderUserInfo = () => {
    return (
        <>
        <input placeholder="이름" />
            <input placeholder="배송지" />
            <input placeholder="전화번호" />
            <input placeholder="배송 요청사항" />
        
        </>
    );
};

export default ProductOrderUserInfo;