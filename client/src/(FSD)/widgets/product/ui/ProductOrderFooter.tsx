import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "@/(FSD)/widgets/app/ui/AppContainer";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import BackBtnShared from "@/(FSD)/shareds/ui/BackBtnShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { useRecoilValue } from "recoil";
import { priceState } from "@/(FSD)/shareds/stores/ProductAtom";

const ProductOrderFooter = () => {

const price = useRecoilValue(priceState)
    
    return (
     <>
     {price}
     </>
    );
};

export default ProductOrderFooter;