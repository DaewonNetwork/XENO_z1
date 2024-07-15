/* import React, { useState } from 'react'
import { useCartProductListRead } from '../api/useCartProductListRead'
import { ProductType } from '@/(FSD)/shareds/types/product/Product.type';
import { useCarttItemUpdate } from '../api/useCarttItemUpdate';
import { useCartDelete } from '../api/useCartDelete';
import { CartItemsProps } from './CartProductList';

interface CartProductCardProps {
    product: CartItemsProps;
}

const CartProductCard = ({ product}: CartProductCardProps) => {
    const [products, setProducts] = useState(product);
    const [quantity, setQuantity] = useState(product.quantity);
    const [isSelected, setIsSelected] = useState(true);
    const updateCartItem = useCarttItemUpdate();
    const removeFromCart = useCartDelete();
    
    console.log();
    

    const handleQuantityChange = async (change: number) => {
        const newQuantity= Math.max(1, quantity + change);
        setQuantity(newQuantity);
        try {
            await updateCartItem.mutateAsync({
                
                updates: { quantity: newQuantity },
            });
        } catch (error) {
            console.error("수량 변경 실패 : ", error);
            setQuantity(quantity);  // 실패 시 원래 수량으로 되돌림
        }
    };

    const handleRemove = async () => {
        try {
            await removeFromCart.mutateAsync(product.productId);
        } catch (error) {
            console.error("장바구니에서 상품 삭제 실패 : ", error);
        }
    };

    const handleSelectChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected = e.target.checked;
        setIsSelected(newSelected);
        try {
            await updateCartItem.mutateAsync({
                cartId: product.productId,
                updates: { selected: newSelected },
            });
        } catch (error) {
            console.error("선택 항목 업데이트 실패 : ", error);
            setIsSelected(isSelected);  // 실패 시 원래 선택 상태로 되돌림
        }
    };

    const calculatePrice = () => {
        if (product.isSale) {
            return product.price * (1 - product.sale / 100);
        }
        return product.price;
    };


    return (
        <div className="flex items-center p-4 border-b">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelectChange}
                className="mr-4"
            />
            {product.productImage && (
                <img
                    src={URL.createObjectURL(new Blob([product.productImage], { type: 'image/jpeg' }))}
                    alt={product.productName}
                    className="w-20 h-20 object-cover mr-4"
                />
            )}
            <div className="flex-grow">
                <p className="text-sm text-gray-500">{product.productBrand}</p>
                <p className="text-lg font-semibold">{product.productName}</p>
                <div className="flex items-center mt-2">
                    {product.isSale && (
                        <span className="line-through text-gray-500 mr-2">
                            {product.price.toLocaleString()}원
                        </span>
                    )}
                    <span className="text-lg font-bold">
                        {calculatePrice().toLocaleString()}원
                    </span>
                </div>
                <div className="flex items-center mt-2">
                    <button onClick={() => handleQuantityChange(-1)} className="border px-2">-</button>
                    <span className="mx-2">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="border px-2">+</button>
                </div>
            </div>
            <button onClick={handleRemove} className="text-red-500">삭제</button>
        </div>
    )
}

export default CartProductCard
 */