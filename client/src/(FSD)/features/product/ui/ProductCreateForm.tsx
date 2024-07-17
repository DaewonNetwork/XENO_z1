"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, } from "@nextui-org/select";
import ProductImageCreateModal from "./ProductImageCreateModal";
import { useRecoilValue } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { useProductCreate } from "../api/useProductCreate";
import { SizeStocksType } from "./ProductColorCreateForm";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";


const ProductCreateForm = () => {
    const [category, setCategory] = useState<string>("");
    const [categorySub, setCategorySub] = useState<string>("");
    const [sizeStocks, setSizeStocks] = useState<SizeStocksType[]>([]);
    const sizeArray = ["S", "M", "L", "XL"];
    const router = useRouter();
    const categories: Record<string, string[]> = {
        상의: ["반팔", "긴팔"],
        하의: ["청바지", "반바지", "면", "나일론"],
        아우터: ["후드집업", "코트", "바람막이", "패딩", "자켓"]
    };


    const [isOpen, setIsOpen] = useState<boolean>(false);

    const productImages = useRecoilValue(productImagesState);
    const productDetailImage = useRecoilValue(productDetailImageState);

    const schema = z.object({
        name: z.string(),
        season: z.string(),
        price: z.string(),
        priceSale: z.string(),
        productNumber: z.string(),
        colors: z.string(),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSuccess = (data: any) => {
        router.push('/seller')
    };

    const onError = () => {
        console.log("error");
    };

    const { mutate, error } = useProductCreate({ onSuccess, onError });

    console.log(error);

    const onSubmit = (data: any) => {
        const formData = new FormData();
        const sizeStocksToSend = sizeStocks.map(({ id, ...rest }) => rest);
        formData.append("productCreateDTO", JSON.stringify({category: category, categorySub: categorySub, price: +data.price, sale: !!data.priceSale, priceSale: +data.priceSale, size: sizeStocksToSend , ...data }));
        productImages.forEach((image:File) => {
            if (image) {
                formData.append("productImages", image);
            }
        });
        formData.append("productDetailImage", productDetailImage);

        mutate(formData);
    };


    const handleAddSizeStock = () => {
        const newId = sizeStocks.length > 0 ? sizeStocks[sizeStocks.length - 1].id + 1 : 1;
        setSizeStocks([...sizeStocks, { id: newId, size: '', stock: 0 }]);
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

    return (
        <>
            <form style={{ display: isOpen ? "none" : "block" }} className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                <TextMediumShared isLabel={true} htmlFor={"name"}>상품 이름</TextMediumShared>
                <FormInputShared autoFocus={true} isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.name} radius={"none"} errorMessage={errors.name && <>{errors.name.message}</>} name={"name"} control={control} placeholder={"상품명을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"productNumber"}>품번</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.product_number} radius={"none"} errorMessage={errors.product_number && <>{errors.product_number.message}</>} name={"productNumber"} control={control} placeholder={"품번을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"season"}>시즌</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.season} radius={"none"} errorMessage={errors.season && <>{errors.season.message}</>} name={"season"} control={control} placeholder={"시즌을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"price"}>가격</TextMediumShared>
                <FormInputShared isClearable size={"lg"} variant={"flat"} isInvalid={!!errors.price} radius={"none"} errorMessage={errors.price && <>{errors.price.message}</>} name={"price"} control={control} placeholder={"가격을 입력해주세요."} />
                <TextMediumShared isLabel={true} htmlFor={"priceSale"}>할인 가격</TextMediumShared>
                <FormInputShared isClearable size="lg" variant="flat" isInvalid={!!errors.priceSale} radius="none" errorMessage={errors.priceSale && <>{errors.priceSale.message}</>} name={"priceSale"} control={control} placeholder="할인 가격을 입력해주세요." />
                <TextMediumShared>카테고리</TextMediumShared>
                <Select
                    size={"lg"}
                    onChange={e => {
                        setCategory(e.target.value);
                        setCategorySub("");
                    }}
                    placeholder={"카테고리를 입력해주세요."}
                >
                    {Object.keys(categories).map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </Select>
                <TextMediumShared>서브 카테고리</TextMediumShared>
                <Select
                    size={"lg"}
                    onChange={e => setCategorySub(e.target.value)}
                    placeholder={"서브 카테고리를 입력해주세요."}
                >
                    {categories[category || "상의"].map((subCat) => (
                        <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                    ))}
                </Select>
                <TextMediumShared isLabel={true} htmlFor={"colors"}>색상</TextMediumShared>
                <FormInputShared isClearable size="lg" variant="flat" isInvalid={!!errors.colors} radius="none" errorMessage={errors.colors && <>{errors.colors.message}</>} name={"colors"} control={control} placeholder="색상을 입력해주세요." />
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
                <Button isDisabled={(!isValid) || (!productImages) || (!productDetailImage) || (!category) || (!categorySub)} fullWidth size={"lg"} type={"submit"} color={"primary"}>등록하기</Button>
            </form>
            {isOpen && <ProductImageCreateModal setIsOpen={setIsOpen} files={productImages} detailFile={productDetailImage}/>}
        </>
    );
};

export default ProductCreateForm;