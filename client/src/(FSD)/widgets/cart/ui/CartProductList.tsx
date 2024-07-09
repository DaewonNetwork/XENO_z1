/* "use client";

import { useCartProductListRead } from '@/(FSD)/entities/cart/api/useCartProductListRead'
import CartProductCard from '@/(FSD)/entities/cart/ui/CartProductCard';
import { ProductType } from '@/(FSD)/shareds/types/product/Product.type';
import React from 'react'

const CartProductList = () => {
    const { data, isError, isPending } = useCartProductListRead();

    const productList: ProductType[] = data;

    if (!productList) return <></>

    return (
        <div>
            {
                productList.map((product) => (
                    <React.Fragment key={product.productId}>
                        <CartProductCard product={product} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default CartProductList
 */