"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorMap, z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select"
import ProductImageCreateModal from "./ProductImageCreateModal";
import { useParams, useRouter } from "next/navigation";
import { useProductRead } from "@/(FSD)/entities/product/api/useProductRead";
import { ProductCreateGetInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";

import { useProductColorCreate } from "../api/useProductColorCreate";
import { useRecoilValue } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { Input } from "@nextui-org/input";



export interface SizeStocksType {
    id: number;
    size: string;
    stock: number;
}


const ProductColorCreateForm = () => {

    const { productId } = useParams<{ productId: string }>();

    const router = useRouter();
    const { data } = useProductRead(+productId)

    const productImages = useRecoilValue(productImagesState);
    const productDetailImage = useRecoilValue(productDetailImageState);



    const [sizeStocks, setSizeStocks] = useState<SizeStocksType[]>([]);
    const sizeArray = ["S", "M", "L", "XL"];

    useEffect(() => {

    }, [data]);

    const productInfo: ProductCreateGetInfoType = data;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const schema = z.object({
        color: z.string().refine(value => !productInfo.colorType.includes(value), {
            message: "중복된 색상입니다."
        }),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });



    const onSuccess = (data: any) => {
        router.push('/seller')
    }

    const { mutate } = useProductColorCreate({ onSuccess });

    const onSubmit = (data: any) => {


        const formData = new FormData();

        const sizeStocksToSend = sizeStocks.map(({ id, ...rest }) => rest);
        formData.append("productColorCreateDTO", JSON.stringify({ productId: productId, color: data.color, size: sizeStocksToSend }));
        productImages.forEach((image: File) => {
            if (image) {
                formData.append("productImages", image);
            }
        });
        formData.append("productDetailImage", productDetailImage);

    
        mutate(formData);

    }

    if (!data) return <></>

    const handleAddSizeStock = () => {
        const newId = sizeStocks.length > 0 ? sizeStocks[sizeStocks.length - 1].id + 1 : 1;
        setSizeStocks([...sizeStocks, { id: newId, size: "", stock: 0 }]);
    };

    const handleRemoveSizeStock = (idToRemove: number) => {
        const updatedSizeStocks = sizeStocks.filter((item) => item.id !== idToRemove);
        setSizeStocks(updatedSizeStocks);
    };

    const handleSizeChange = (selectedSize: string, id: number) => {
        const updatedSizeStocks = sizeStocks.map(item =>
            item.id === id ? { ...item, size: selectedSize } : item
        );
        setSizeStocks(updatedSizeStocks);
    };

    const handleStockChange = (e: any, id: number) => {
        const updatedSizeStocks = sizeStocks.map(item =>
            item.id === id ? { ...item, stock: e.target.value } : item
        );
        setSizeStocks(updatedSizeStocks);
    };

    const isSizeStockValid: boolean = sizeStocks.length === 0 || sizeStocks.some(item => !item.size || item.stock === 0);

    return (
        <>
            <form style={{ display: isOpen ? "none" : "block" }} className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                <TextMediumShared isLabel={true} htmlFor={"name"}>상품 이름</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"name"} control={control} placeholder={productInfo.name} />
                <TextMediumShared isLabel={true} htmlFor={"productNumber"}>품번</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"productNumber"} control={control} placeholder={productInfo.productNumber} />
                <TextMediumShared isLabel={true} htmlFor={"season"}>시즌</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"season"} control={control} placeholder={productInfo.season} />
                <TextMediumShared isLabel={true} htmlFor={"price"}>가격</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"price"} control={control} placeholder={`${productInfo.price.toLocaleString()}원`} />
                <TextMediumShared isLabel={true} htmlFor={"priceSale"}>할인 가격</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"priceSale"} control={control} placeholder={`${productInfo.priceSale.toLocaleString()}원`} />
                <TextMediumShared>카테고리</TextMediumShared>
                <Select
                    size={"lg"}
                    placeholder={productInfo.category}
                    isDisabled
                >
                    <SelectItem key={""}>
                    </SelectItem>
                </Select>
                <TextMediumShared>서브 카테고리</TextMediumShared>
                <Select
                    size={"lg"}
                    placeholder={productInfo.categorySub}
                    isDisabled
                >
                    <SelectItem key={""}>
                    </SelectItem>
                </Select>
                <TextMediumShared>기존 색상입니다.</TextMediumShared>
                {productInfo.colorType.map((color, index) => (
                    <TextMediumShared key={index}>{color}</TextMediumShared>
                ))}
                <TextMediumShared isLabel={true} htmlFor={"color"}>색상</TextMediumShared>
                <FormInputShared size="lg" variant="flat" isInvalid={!!errors.color} radius="none" errorMessage={errors.color && <>{errors.color.message}</>} name={"color"} control={control} placeholder="색상을 입력해주세요." />
                <Button
                    type="button"
                    onClick={handleAddSizeStock}
                    style={{ marginTop: "1rem" }}
                >
                    사이즈 추가
                </Button>
                {sizeStocks.map((sizeStock) => (
                    <div key={sizeStock.id} style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-start" }} >

                        <Select
                            placeholder="사이즈 선택"
                            aria-label="사이즈 선택창"
                            value={sizeStock.size}
                            size="md"
                            classNames={{
                                base: "w-100"
                            }}
                            style={{ width: "150px" }}
                            onChange={(selectedSize) => handleSizeChange(selectedSize.target.value, sizeStock.id)}

                        >
                            {sizeArray.map((size) => (
                                <SelectItem key={size} value={size} isDisabled={sizeStocks.some((item) => item.size === size && item.id !== sizeStock.id)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            isClearable
                            size="md"
                            classNames={{
                                base: "w-100"
                            }}

                            style={{ width: "100px" }}
                            placeholder="재고 입력"
                            onChange={(e) => handleStockChange(e, sizeStock.id)}
                            aria-label="재고 입력란"
                        />
                        <Button
                            variant="flat"
                            onClick={() => handleRemoveSizeStock(sizeStock.id)}
                        >
                            삭제
                        </Button>
                    </div>
                ))}

                <TextMediumShared>이미지</TextMediumShared>
                <Button
                    onClick={_ => {
                        setIsOpen(true);
                    }}
                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                >
                    이미지 등록하기
                </Button>
                <Button isDisabled={(!isValid) || (!productImages) || (!productDetailImage) || (isSizeStockValid)} fullWidth size={"lg"} type={"submit"} color={"primary"}>등록하기</Button>
            </form>
            {isOpen && <ProductImageCreateModal setIsOpen={setIsOpen} files={productImages} detailFile={productDetailImage} />}
        </>
    );
};

export default ProductColorCreateForm;