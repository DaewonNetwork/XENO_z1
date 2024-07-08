import React from 'react'
import { useCartProductListRead } from '@/(FSD)/entities/cart/api/useCartProductListRead'
import { useCartSummary } from '@/(FSD)/entities/cart/api/useCartSummary'
import CartProductCard from './CartProductCard'
import { useRecoilValue } from 'recoil'
import { userState } from '@/(FSD)/shareds/stores/UserAtom'
import { UserType } from '@/(FSD)/shareds/types/User.type'

const CartProductList = () => {
    const user: UserType = useRecoilValue(userState);
    if(!user) return <></>
    const { data: cartItems, isLoading: itemsLoading, error: itemsError } = useCartProductListRead(user.userId);
    const { data: cartSummary, isLoading: summaryLoading, error: summaryError } = useCartSummary(user.userId);

    if (!user) {
        return <div>로그인이 필요합니다.</div>;
    }

    if (itemsLoading || summaryLoading) return <div>Loading...</div>;
    if (itemsError || summaryError) return <div>Error loading cart data</div>;

    return (
        <div>
            {cartItems?.map((item) => (
                <CartProductCard
                    key={item.productId}
                    product={{
                        ...item,
                        sale: item.sale ?? 0,
                        isSale: item.sale !== undefined && item.sale > 0
                    }}
                    quantity={item.quantity}
                    isSelected={item.selected}
                />
            ))}
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