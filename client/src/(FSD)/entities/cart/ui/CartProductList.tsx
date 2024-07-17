"use client"

import React, { useMemo } from 'react'
import { useCartProductListRead } from '@/(FSD)/entities/cart/api/useCartProductListRead'
import { useCartSummary } from '@/(FSD)/entities/cart/api/useCartSummary'
import { useRecoilValue } from 'recoil'
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { UserType } from '@/(FSD)/shareds/types/User.type'
import { Skeleton } from '@nextui-org/skeleton'
import { useUserRead } from '../../user/api/useUserRead'
import { product } from '@/(FSD)/shareds/styles/SkeletonStyle.module.scss'
import CartProductCard from './CartProductCard'
import { cartTotalState, cartUpdateState } from '@/(FSD)/shareds/stores/CartAtom'

export interface CartItemsProps {
    cartId: number;
    userId: number;
    productsColorSizeId: number;
    quantity: number;
    price: number;
    brandName: string;
    imageData: Uint8Array;
    priceSale: number | undefined;
    sale: boolean;
    productName: string;
    item: CartItemsProps;
}

const CartProductList = () => {
    const { data, isLoading: itemsLoading, error: itemsError } = useCartProductListRead();
    const { data: initialCartSummary, isLoading: summaryLoading, error: summaryError } = useCartSummary();

    const cartUpdate = useRecoilValue(cartUpdateState);
    const cartTotal = useRecoilValue(cartTotalState);

    const cartItems: CartItemsProps[] = data || [];
    console.log(cartItems);

    const cartSummary = useMemo(() => {
        if (!cartItems.length) return initialCartSummary;

        return {
            totalItems: cartTotal.totalItems,
            totalPrice: cartTotal.totalPrice
        };
    }, [cartItems, initialCartSummary, cartTotal]);


    if (itemsLoading || summaryLoading) return <div>Loading...</div>;
    if (itemsError || summaryError) return <div>Error loading cart data</div>;

    return (
        <div>  {/* 스타일 클래스 추가 */}
            {cartItems?.map((product) => (
                // CartProductCard 컴포넌트로 교체
                <React.Fragment key={product.productsColorSizeId}>
                    <CartProductCard product={product} />
                </React.Fragment>
            ))}
            {cartSummary && (
                <div>  {/* 스타일 클래스 변경 */}
                    <p>총 상품 수: {cartSummary.totalItems}</p>
                    <p>총 금액: {cartSummary.totalPrice.toLocaleString()}원</p>
                </div>
            )}
        </div>
    )
}

export default CartProductList