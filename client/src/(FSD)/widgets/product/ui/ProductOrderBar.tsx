'use client'

import React, { useEffect, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { orderInfoType, ProductOrderBarType } from "@/(FSD)/features/product/ui/ProductOrderContainer";
import { useProductAddCart } from "@/(FSD)/features/product/api/useProductAddCart";

type ProductList = {
    productColorSizeId: number;
    color: string;
    size: string;
    quantity: number;
    price: number;
};


const ProductOrderBar = ({ orderBar }: { orderBar: ProductOrderBarType }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelectedColor, setIsSelectedColor] = useState(false);
    const [isSelectedSize, setIsSelectedSize] = useState(false);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [sizes, setSizes] = useState<string[]>([]);
    const [products, setProducts] = useState<ProductList[]>([]);

    const uniqueColors = Array.from(new Set(orderBar.orderInfo.map(item => item.color)));

    const desiredOrder = ['S', 'M', 'L', 'XL'];

    Object.keys(sizes).forEach(() => {
        sizes.sort((a, b) => {
            return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
        });
    });


    useEffect(() => {
        if (color === '') {
            setSizes([]);
            return;
        }

        const filteredSizes = orderBar.orderInfo
            .filter(item => item.color === color)
            .map(item => item.size);

        setSizes(filteredSizes);
    }, [color, orderBar.orderInfo]);

    useEffect(() => {
        const totalProductCount = products.reduce((acc, curr) => acc + curr.quantity, 0);
        setCount(totalProductCount);
        const totalProductPrice = products.reduce((acc, curr) => acc + curr.price, 0);
        setPrice(totalProductPrice);
        console.log(products)
    }, [products]);

    const getProductColorSizeId = (color: string, size: string): number | undefined => {
        const orderItem = orderBar.orderInfo.find(item => item.color === color && item.size === size);
        return orderItem?.productColorSizeId;
    };

    const handleBuyClick = () => {
        setIsOpen(true);
    };

    const handleColorSelect = () => {
        setIsSelectedColor(!isSelectedColor);
    };

    const handleSizeSelect = () => {
        if (color == '') {
            alert("색상을 선택해주세요.");
        } else {
            setIsSelectedSize(!isSelectedSize);
        }
    };

    const selectColor = (color: string) => {
        setColor(color)
        setIsSelectedColor(false);

    }

    const selectSize = (size: string) => {
        setSize(size);
        setIsSelectedSize(false);
        const productColorSizeId = getProductColorSizeId(color, size);

        if (productColorSizeId !== undefined) {
            // 제품 정보를 products 배열에 추가하기 전에 중복 체크
            const isDuplicate = products.some(product => product.productColorSizeId === productColorSizeId);

            if (isDuplicate) {
                alert("이미 선택한 옵션입니다.");
            } else {
                setProducts(prevProducts => [
                    ...prevProducts,
                    { productColorSizeId, color, size, quantity: 1, price: orderBar.price }
                ]);
                setColor('');
                setSize('');
                setIsSelectedColor(false);
                setIsSelectedSize(false);
            }
        } else {
            console.error(`해당 색상(${color})과 사이즈(${size})에 맞는 제품 정보가 없습니다.`);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newQuantity = parseInt(e.target.value); // input에서 받아온 수량 값
        if (!isNaN(newQuantity) && newQuantity >= 0) { // 유효한 수량이면 업데이트
            const updatedProducts = [...products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                quantity: newQuantity,
                price: orderBar.price * newQuantity
            };
            setProducts(updatedProducts); // 상태 업데이트
        }

    };

    const handleDelete = (index: number) => {
        // products 배열에서 해당 인덱스의 상품을 삭제하는 로직
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1); // 해당 인덱스의 상품 삭제
        setProducts(updatedProducts); // 상태 업데이트
    };


    const onSuccess = (data: any) => {
        console.log("성공")
        setProducts([])
    }

    // useProductAddCart 훅 사용
    const { mutate } = useProductAddCart({ onSuccess });


    const handleAddToCart = () => {
        if (products.length === 0) {
            alert("상품 옵션을 선택해주세요.");
        } else {
            // color와 size를 제외한 새로운 배열 생성
            const newProducts = products.map(({ color, size, ...rest }) => rest);
            console.log(newProducts);
            setIsOpen(false)
            setIsSelectedColor(false);
            setIsSelectedSize(false);

            mutate(newProducts);
        }
    };


    const handlePurchase = () => {
        if (!isSelectedColor || !isSelectedSize) {
            alert("상품 옵션을 선택해주세요.");
        } else {
            // 구매 로직
            setIsOpen(false);
            setIsSelectedColor(false);
            setIsSelectedSize(false);
            // 구매 페이지로 이동하는 로직 (예: window.location.href = "/purchase")
        }
    };

    const handleExit = () => {
        setIsOpen(false);
        setIsSelectedColor(false);
        setIsSelectedSize(false);
        setProducts([])
    }

    const increaseCount = (index: number) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        updatedProducts[index].price = orderBar.price * updatedProducts[index].quantity; // price * quantity로 업데이트
        setProducts(updatedProducts);
    };

    const decreaseCount = (index: number) => {
        if (products[index].quantity === 1) {
            alert("더 이상 줄일 수 없습니다.");
            return;
        }
        const updatedProducts = [...products];
        updatedProducts[index].quantity -= 1;
        updatedProducts[index].price = orderBar.price * updatedProducts[index].quantity; // price * quantity로 업데이트
        setProducts(updatedProducts);
    };

    return (
        <>
            {!isOpen ? (
                <div className={styles.product_order_bar}>
                    <AppContainer>
                        <AppInner>
                            <div className={styles.order_inner}>
                                <div className={styles.order_like_btn}>
                                    <ProductLikeBtn isLike={orderBar?.like} isIndex={true} size={"md"} index={orderBar?.likeIndex} />
                                </div>
                                <div className={styles.order_btn}>
                                    <Button color="primary" fullWidth radius="sm" onClick={handleBuyClick}>
                                        구매하기
                                    </Button>
                                </div>
                            </div>
                        </AppInner>
                    </AppContainer>
                </div>
            ) : (
                <div className={styles.product_order_modal}>
                    <button className={styles.product_order_modal_exit} onClick={handleExit}>닫기</button>
                    {!isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_modal_option_block}>
                            <div className={styles.product_order_modal_option_select_block}>
                                <button className={styles.product_order_option_select_btn} onClick={handleColorSelect}>{color == '' ? '색상 선택' : color}</button>
                                <button className={styles.product_order_option_select_btn} onClick={handleSizeSelect}>{size == '' ? '사이즈 선택' : size}</button>
                            </div>
                        </div>
                    )}
                    {isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_option_select}>
                            <button className={styles.product_order_option_select_btn_after} onClick={handleColorSelect}>색상 선택</button>
                            <ul className={styles.product_order_option_color_list}>
                                {uniqueColors.map((color, index) => (
                                    <li className={styles.product_order_option_color_list_item} key={index} onClick={() => selectColor(color)} >{color}</li>
                                ))}
                            </ul>

                        </div>
                    )}
                    {color != '' && isSelectedSize && (
                        <>
                            <div className={styles.product_order_option_select}>
                                <button className={styles.product_order_option_select_btn_after} onClick={handleSizeSelect}>사이즈 선택</button>
                                <ul className={styles.product_order_option_color_list}>
                                    {sizes.map((size, index) => (
                                        <li className={styles.product_order_option_color_list_item} key={index} onClick={() => selectSize(size)}>{size}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {products.length > 0 && (
                        <div className={styles.product_order_modal_product_info}>
                            <ul className={styles.product_order_modal_product_list}>
                                {products.map((product, index) => (
                                    <li className={styles.product_order_modal_product_list_item} key={index}>
                                        <div className={styles.product_order_modal_product_list_item_info}>
                                            {product.color} / {product.size}
                                        </div>
                                        <div className={styles.product_order_modal_product_list_item_quantity}>
                                            <Button onClick={() => decreaseCount(index)}>-</Button>
                                            <input
                                                className={styles.product_order_modal_product_list_item_quantity_input}
                                                type="number"
                                            
                                                value={product.quantity}

                                                onChange={(e) => handleQuantityChange(e, index)}
                                            />
                                            <Button onClick={() => increaseCount(index)}>+</Button>
                                        </div>
                                        <div className={styles.product_order_modal_product_list_item_price}>
                                            {product.price?.toLocaleString()}원
                                            <Button onClick={() => handleDelete(index)}>삭제</Button> {/* 삭제 버튼 추가 */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {!isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_modal_price}>
                            <span>상품 {count}개 </span> <span>{price?.toLocaleString()}원</span>
                        </div>
                    )}
                    {!isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_modal_buy_block}>
                            <button onClick={handleAddToCart} className={styles.product_order_modal_add_cart_btn}>장바구니</button>
                            <button onClick={handlePurchase} className={styles.product_order_modal_buy_btn}>구매하기</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProductOrderBar;
