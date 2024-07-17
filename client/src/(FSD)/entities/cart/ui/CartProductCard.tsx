import React, { useEffect, useMemo, useState } from 'react'
import { useCartProductListRead } from '../api/useCartProductListRead'
import { ProductType } from '@/(FSD)/shareds/types/product/Product.type';
import { useCartItemUpdate } from '../api/useCartItemUpdate';
import { CartItemsProps } from './CartProductList';
import { useUserRead } from '../../user/api/useUserRead';
import { useRecoilState, useRecoilValue } from 'recoil';
import { product } from '@/(FSD)/shareds/styles/SkeletonStyle.module.scss';
import { cartTotalState, cartUpdateState } from '@/(FSD)/shareds/stores/CartAtom';
import { error, log } from 'console';
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { Skeleton } from '@nextui-org/skeleton';
import { usePrdouctListAllRead } from '../../product/api/usePrdouctListAllRead';
import { useProductRead } from '../../product/api/useProductRead';
import { useProductColorRead } from '../../product/api/useProductColorRead';
import { useProductColorCardRead } from '../../product/api/useProductColorCardRead';
import { useCartListAdd } from '@/(FSD)/features/cart/api/useCartListAdd';

interface CartProductCardProps {
    product: CartItemsProps;
}

const CartProductCard = ({ product }: CartProductCardProps & ProductType) => { 
    const onSuccess=(data: any) => {

    }
    const { mutate: addToCart, status: add, error: addError } = useCartListAdd({onSuccess});
    const { data: userData, isLoading: userLoading, error: userError } = useUserRead();

    // product에서 직접 productColorSizeId를 사용합니다
    const { data: productData, isLoading: productLoading, error: productError } = useProductRead(product.productsColorSizeId);

    // 모든 데이터가 로드되면 price를 사용할 수 있습니다
    const productPrice = productData?.price;   
    console.log(productPrice);

    const [cartUpdate, setCartUpdate] = useRecoilState(cartUpdateState);
    const [cartTotal, setCartTotal] = useRecoilState(cartTotalState);

    const [total,setTotal] = useState(0)

    setTotal(product.price)


    const { mutate: updateCartItem } = useCartItemUpdate();
    
    

    const currentQuantity = useMemo(() => 
        cartUpdate[product.productsColorSizeId]?.quantity || product.quantity,
    [cartUpdate, product.productsColorSizeId, product.quantity]);

    const totalPrice = useMemo(() => 
        currentQuantity * product.price,
    [currentQuantity, product.price]);

    // useEffect(() => {
    //     setCartUpdate((prev: any[]) => ({
    //         ...prev,
    //         [product.productsColorSizeId]: {
    //             quantity: product.quantity,
    //             isSelected: true,
    //             price: product.price
    //         }
    //     }));
    // }, [product, setCartUpdate]);

    const handleItemUpdate = (newQuantity: number) => {

        setCartUpdate((prev: any[]) => ({
            ...prev,
            [product.productsColorSizeId]: {
                ...prev[product.productsColorSizeId],
                quantity: newQuantity,
                price: productPrice * newQuantity,
            }
        }));

        setCartTotal(prev => ({
            totalItems: prev.totalItems - product.quantity + newQuantity,
            totalPrice: prev.totalPrice - (product.quantity * productPrice) + (newQuantity * productPrice)
        }));

        // 서버로 업데이트 요청
        updateCartItem({
            cartId: product.cartId,
            quantity: newQuantity,
            isSelected: cartUpdate[product.productsColorSizeId]?.isSelected || true,
            price: product.price
        }, {
            onSuccess: (data) => {
                console.log("Cart item updated successfully", data.message);
            },
            onError: (error) => {
                console.log("Error updating cart item:", error);

                setCartUpdate((update: any[]) => ({
                    ...update,
                    [product.productsColorSizeId]: {
                        ...update[product.productsColorSizeId],
                        quantity: product.quantity,
                    }
                }));
                
                setCartTotal(total => ({
                    totalItems: total.totalItems + newQuantity + product.quantity,
                    totalPrice: total.totalPrice - (newQuantity * product.price) + (product.quantity * product.price)
                }));
            }
        });
    };
    

    return (
        <div>
            <p>Brand: {product.brandName}</p>
            <p>Product: {product.productName}</p>
            <div>
            <p>
                Total: {total.toLocaleString()}원
            </p>
            </div>
            <div>
                <p>Quantity: </p>
                <button
                    onClick={() => handleItemUpdate(Math.max(1, currentQuantity - 1))}
                >
                    -
                </button>
                <button
                    onClick={() => handleItemUpdate(currentQuantity + 1)}
                >
                    +
                </button>
                <span>
                    {cartUpdate[product.productsColorSizeId]?.quantity || product.quantity}
                </span>
            </div>
            {!product.imageData ? (
                <Skeleton className={styles.product_skeleton} />
            ) : (
                <img
                    src={`data:image/jpeg;base64,${product.imageData}`}
                    className={styles.product_image}
                    alt={`${product.brandName} ${product.productName}`}
                />
            )}
        </div>
    )
}

export default CartProductCard
