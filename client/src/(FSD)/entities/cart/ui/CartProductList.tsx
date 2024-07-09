"use client"

import React from 'react'
import { useCartProductListRead } from '@/(FSD)/entities/cart/api/useCartProductListRead'
import { useCartSummary } from '@/(FSD)/entities/cart/api/useCartSummary'
import { useRecoilValue } from 'recoil'
import { userState } from '@/(FSD)/shareds/stores/UserAtom'
import { UserType } from '@/(FSD)/shareds/types/User.type'

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
    item: CartItemsProps;
}

const CartProductList = () => {
    const { data, isLoading: itemsLoading, error: itemsError } = useCartProductListRead();
    const { data: cartSummary, isLoading: summaryLoading, error: summaryError } = useCartSummary();
    const {user }= useRecoilValue(userState);
    console.log(user);
    console.log(cartSummary);
    
   console.log("data" + data);
   

    const cartItems: CartItemsProps[] = data || [];
    console.log(cartItems);
    
    // if (!user) {
    //     return <div>로그인이 필요합니다.</div>;
    // }

    if (itemsLoading || summaryLoading) return <div>Loading...</div>;
    if (itemsError || summaryError) return <div>Error loading cart data</div>;

    return (
        <div>
            {/* {{{cartItems?.map((product) => (
                <CartProductList
                    key={product.productsColorSizeId}
                    
                />
            ))}}} */}
            {cartSummary && (
                <div className="mt-4 p-4 bg-gray-100">
                    <p>총 상품 수: {cartSummary.totalItems}</p>
                    <p>총 금액: {cartSummary.totalPrice.toLocaleString()}원</p>
                </div>
            )}
        </div>
    )
}

export default CartProductList