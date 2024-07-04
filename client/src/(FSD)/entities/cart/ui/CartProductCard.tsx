import React from 'react'
import { useCartProductListRead } from '../api/useCartProductListRead'
import { ProductType } from '@/(FSD)/shareds/types/product/Product.type';

interface CartProductCardType {
    product: ProductType;
}

const CartProductCard = ({ product }: CartProductCardType) => {

    return (
        <div>

        </div>
    )
}

export default CartProductCard
