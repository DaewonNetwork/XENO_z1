"use client"

import React, { useEffect, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";

import { useParams, useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { imageState, nameState, productsState } from "@/(FSD)/shareds/stores/ProductAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import { ProductOrderBarType } from "./ProductOrderBarContainer";
import { ProductImages } from "./ProductOtherColorImageList";
import { isLoggedInState } from "@/(FSD)/shareds/stores/UserAtom";
import { useCartListAdd } from "@/(FSD)/features/cart/api/useCartListAdd";

type SizeAndStockType = {
    size: string;
    stock: number;
};

const ProductOrderBar = ({ orderBar, parentRefetch }: { orderBar: ProductOrderBarType, parentRefetch?: any }) => {
    if(!orderBar) return <></>
    const {productId } = useParams<{ productId: string }>();
    const [isOpenOrder, setisOpenOrder] = useState(false);
    const [isSelectedColor, setIsSelectedColor] = useState(false);
    const [isSelectedSize, setIsSelectedSize] = useState(false);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [sizeAndStock, setSizeAndStock] = useState<SizeAndStockType[]>([]);
    const [products, setProducts] = useState<OrderProductInfoType[]>([]);
    const name = useRecoilValue(nameState);
    const images: ProductImages[] = useRecoilValue(imageState)
    const [newProducts, setNewProducts] = useRecoilState<OrderProductInfoType[]>(productsState)
    const  isLoggedIn  = useRecoilValue(isLoggedInState);
  
    const desiredOrder = ['S', 'M', 'L', 'XL'];

    useEffect(() => {
        if (color === "") {
            setSizeAndStock([]);
            return;
        }

        // color에 해당하는 size와 stock 필터링
        const filteredSizes = orderBar.orderInfo
            .filter(item => item.color === color)
            .map(item => ({ size: item.size, stock: item.stock }));

        // 중복 사이즈 제거 및 정렬
        const uniqueSizes = Array.from(new Set(filteredSizes.map(item => item.size)))
            .map(size => {
                const stock = filteredSizes
                    .filter(item => item.size === size)
                    .reduce((total, current) => total + current.stock, 0);
                return { size, stock };
            });

        uniqueSizes.sort((a, b) => {
            return desiredOrder.indexOf(a.size) - desiredOrder.indexOf(b.size);
        });

        setSizeAndStock(uniqueSizes);
    }, [color, orderBar.orderInfo]);


    useEffect(() => {
        const totalProductCount = products.reduce((acc, curr) => acc + curr.quantity, 0);
        setCount(totalProductCount);
        const totalProductPrice = products.reduce((acc, curr) => acc + curr.price, 0);
        setPrice(totalProductPrice);
  
    }, [products]);

    
    const uniqueColors = Array.from(new Set(orderBar.orderInfo.map(item => item.color)));

    const getProductColorSizeId = (color: string, size: string): number | undefined => {
        const orderItem = orderBar.orderInfo.find(item => item.color === color && item.size === size);
        return orderItem?.productColorSizeId;
    };

    const getproductId = (color: string): number | undefined => {
        const orderItem = orderBar.orderInfo.find(item => item.color === color);
        return orderItem?.productId;
    };

    const handleBuyClick = () => {
        setisOpenOrder(true);
    };

    const handleColorSelect = () => {
        setIsSelectedColor(!isSelectedColor);
    };

    const handleSizeSelect = () => {
        if (color == "") {
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
        const productId = getproductId(color)

        if (productColorSizeId !== undefined) {
            // 제품 정보를 products 배열에 추가하기 전에 중복 체크
            const isDuplicate = products.some(product => product.productColorSizeId === productColorSizeId);

            if (isDuplicate) {
                alert("이미 선택한 옵션입니다.");
            } else {
                setProducts(prevProducts => [
                    ...prevProducts,
                    { productColorSizeId, color, size, quantity: 1, price: orderBar.price, productId: productId }
                ]);
                setColor("");
                setSize("");
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



    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const onSuccess = (data: any) => {


        setProducts([]);
        onOpen();

        setTimeout(() => {
            onClose();
        }, 3000);

    }

    // useProductAddCart 훅 사용
    const { mutate } = useCartListAdd({ onSuccess });

    const handleAddToCart = () => {
        if (products.length === 0) {
            alert("상품 옵션을 선택해주세요.");
        } else if (!isLoggedIn) {
            router.push("/auth/signin")
        } else {
            // color와 size를 제외한 새로운 배열 생성
            const newProducts = products.map(({ color, size, ...rest }) => rest);
      
            setisOpenOrder(false)
            setIsSelectedColor(false);
            setIsSelectedSize(false);
            mutate(newProducts);
        }
    };

    const router = useRouter();

    const linkToCart = () => {
        // router.push(`/cart`)
        window.location.href = '/cart'
       
    }

    const handlePurchase = () => {
        if (products.length == 0) {
            alert("상품 옵션을 선택해주세요.");
        } else if (!isLoggedIn) {
            router.push("/auth/signin")
        }  else {
            setisOpenOrder(false);
            setIsSelectedColor(false);
            setIsSelectedSize(false);
            const newProducts1: OrderProductInfoType[] = products.map(product => {

                const matchingImage = images.find(image => image.productId === product.productId);

                const productImage = matchingImage ? matchingImage.productColorImage : null;

                return {
                    ...product,
                    name: name,
                    image: productImage
                };
            });

            setNewProducts(newProducts1)

            setProducts([])

            if (newProducts1.length > 0) {
                localStorage.setItem("newProducts", JSON.stringify(newProducts1));
                router.push("/order");
            }
        }
    };

    const handleExit = () => {
        setisOpenOrder(false);
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
            <Modal size={"xs"} isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">장바구니 추가 완료</ModalHeader>
                    <ModalBody>
                        <p>
                            장바구니에 상품이 담겼습니다.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={linkToCart}>
                            장바구니로 가기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {!isOpenOrder ? (
                <div className={styles.product_order_bar}>
                    <AppContainer>
                        <AppInner>
                            <div className={styles.order_inner}>
                                <div className={styles.order_like_btn}>
                                    <ProductLikeBtn productId={Number(productId)} isLike={orderBar?.like} isIndex={true} size={"md"} index={orderBar?.likeIndex}
                                        parentRefetch={parentRefetch} />
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
                                <button className={styles.product_order_option_select_btn} onClick={handleColorSelect}>{color == "" ? "색상 선택" : color}</button>
                                <button className={styles.product_order_option_select_btn} onClick={handleSizeSelect}>{size == "" ? "사이즈 선택" : size}</button>
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
                    {color != "" && isSelectedSize && (
                        <>
                            <div className={styles.product_order_option_select}>
                                <button className={styles.product_order_option_select_btn_after} onClick={handleSizeSelect}>사이즈 선택</button>
                                <ul className={styles.product_order_option_color_list}>
                                    {sizeAndStock.map((item, index) => (
                                        <li
                                            className={styles.product_order_option_color_list_item}
                                            key={index}
                                            onClick={() => selectSize(item.size)}
                                        >
                                            {item.size} {item.stock <= 5 ? `(${item.stock}개 남음)` : ""}
                                        </li>
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
                                            <Button isIconOnly onClick={() => decreaseCount(index)}>-</Button>
                                            <input
                                                className={styles.product_order_modal_product_list_item_quantity_input}
                                                type="number"

                                                value={product.quantity}

                                                onChange={(e) => handleQuantityChange(e, index)}
                                            />
                                            <Button isIconOnly onClick={() => increaseCount(index)}>+</Button>
                                        </div>
                                        <div className={styles.product_order_modal_product_list_item_price}>
                                            {product.price?.toLocaleString()}원
                                            <Button isIconOnly  onClick={() => handleDelete(index)}>삭제</Button> {/* 삭제 버튼 추가 */}
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
