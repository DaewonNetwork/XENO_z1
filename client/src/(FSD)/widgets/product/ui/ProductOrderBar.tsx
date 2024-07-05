'use client'

import React, { useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { orderInfoType, ProductOrderBarType } from "@/(FSD)/features/product/ui/ProductOrderContainer";
type productList = {
    productColorSizeId: number;
    color: string;
    size: string;
    count: number;
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

    const uniqueColors = Array.from(new Set(orderBar.orderInfo.map(item => item.color)));

    const sizes: { [key: string]: string[] } = {};

    // 데이터 순회하여 Size 배열에 size 추가
    orderBar.orderInfo.forEach(item => {
        const size = item.size;

        if (!sizes[color]) {
            sizes[color] = [];
        }

        // 중복 추가 방지
        if (!sizes[color].includes(size)) {
            sizes[color].push(size);
        }
    });


    const desiredOrder = ['S', 'M', 'L', 'XL'];

    // Object.keys(sizes).forEach(color => {
    //     sizes[color].sort((a, b) => {
    //         return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
    //     });
    // });

    console.log(sizes)

    const handleBuyClick = () => {
        setIsOpen(true);
    };

    const handleColorSelect = () => {
        setIsSelectedColor(!isSelectedColor);
    };

    const selectColor = (color: string) => {
        setColor(color)
        setIsSelectedColor(false);
    }

    const products: productList[] = [];


    const getProductColorSizeId = (color: string, size: string): number | undefined => {
        const orderItem = orderBar.orderInfo.find(item => item.color === color && item.size === size);
        return orderItem?.productColorSizeId;
    };

    const selectSize = (size: string) => {
        setSize(size);
        const productColorSizeId = getProductColorSizeId(color, size);

        if (productColorSizeId !== undefined) {
            // 제품 정보를 products 배열에 추가
            products.push({ productColorSizeId: productColorSizeId, color, size, count: 1, price });
            setColor('');
            setSize('');
            setIsSelectedColor(false);
            setIsSelectedSize(false);
            console.log(products)
        } else {
            console.error(`해당 색상(${color})과 사이즈(${size})에 맞는 제품 정보가 없습니다.`);
        }
    };



    const handleSizeSelect = () => {
        if (color == '') {
            alert("색상을 선택해주세요.");
        } else {
            setIsSelectedSize(!isSelectedSize);
        }
    };

    const handleAddToCart = () => {
        if (!isSelectedColor || !isSelectedSize) {
            alert("색상과 사이즈를 모두 선택해 주세요.");
        } else {
            // 장바구니에 추가 로직
            setIsOpen(false);
            setIsSelectedColor(false);
            setIsSelectedSize(false);
        }
    };

    const handlePurchase = () => {
        if (!isSelectedColor || !isSelectedSize) {
            alert("색상과 사이즈를 모두 선택해 주세요.");
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
    }

    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        if (count == 1) {
            alert("더 이상 줄일 수 없습니다.");
        } else {
            setCount(prevCount => prevCount - 1);
        }
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
                                    {sizes[color].map((size, index) => (
                                        <li className={styles.product_order_option_color_list_item} key={index} onClick={() => selectSize(size)}>
                                            {size}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </>
                    )}

                    {products.length > 0 && (
                        <div className={styles.product_order_modal_product_info}>
                            {products.map((product, index) => (
                                <div key={index}>
                                    {product.color} / {product.size}
                                    <Button onClick={decreaseCount}>-</Button>
                                    {product.count}
                                    <Button onClick={increaseCount}>+</Button>
                                    {product.price * product.count}원
                                </div>
                            ))}
                        </div>)
                    }
                    {!isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_modal_price}>
                            상품 {count}개 {price * count}원
                        </div>
                    )}


                    {!isSelectedColor && !isSelectedSize && (
                        <div className={styles.product_order_modal_buy_block}>
                            <Button onClick={() => alert("색상과 사이즈를 선택해 주세요.")}>장바구니</Button>
                            <Button onClick={() => alert("색상과 사이즈를 선택해 주세요.")}>구매하기</Button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProductOrderBar;
