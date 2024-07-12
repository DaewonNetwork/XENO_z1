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
import { useParams } from "next/navigation";
import { useProductRead } from "@/(FSD)/entities/product/api/useProductRead";
import { ProductCreateGetInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";

import { useProductColorCreate } from "../api/useProductColorCreate";




const ProductColorCreateForm = () => {

    const { productId } = useParams<{ productId: string }>();


    const { data } = useProductRead(+productId)
    const sizeArray = ["S", "M", "L", "XL"];

    useEffect(() => {
        console.log(data);

    }, [data]);

    const productInfo: ProductCreateGetInfoType = data;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const schema = z.object({
        color: z.string().refine(value => !productInfo.colorType.includes(value), {
            message: '중복된 색상입니다.'
        }),
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const sizes = [
        { size: "M", stock: 10 },
        { size: "L", stock: 20 }
    ];

    const onSuccess = (data: any) => {
        console.log("성공")
    }

    const { mutate } = useProductColorCreate({ onSuccess });

    const onSubmit = (data: any) => {
    

        const formData = new FormData();
      
        formData.append("productColorCreateDTO", JSON.stringify({ productId: productId, color: data.color, size:sizes  }));

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        mutate(formData);

    }

    if (!data) return <></>


    return (
        <>
            <form           className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                <TextMediumShared isLabel={true} htmlFor={"name"}>상품 이름</TextMediumShared>
                <FormInputShared readOnly={true} name={"name"} control={control} placeholder={productInfo.name} />
                <TextMediumShared isLabel={true} htmlFor={"category"}>카테고리</TextMediumShared>
                <FormInputShared readOnly={true} name={"category"} control={control} placeholder={productInfo.category} />
                <TextMediumShared isLabel={true} htmlFor={"categorySub"}>하위 카테고리</TextMediumShared>
                <FormInputShared readOnly={true} name={"categorySub"} control={control} placeholder={productInfo.categorySub} />
                <TextMediumShared isLabel={true} htmlFor={"productNumber"}>품번</TextMediumShared>
                <FormInputShared readOnly={true} name={"productNumber"} control={control} placeholder={productInfo.productNumber} />
                <TextMediumShared isLabel={true} htmlFor={"season"}>시즌</TextMediumShared>
                <FormInputShared readOnly={true} name={"season"} control={control} placeholder={productInfo.season} />
                <TextMediumShared isLabel={true} htmlFor={"price"}>가격</TextMediumShared>
                <FormInputShared readOnly={true} name={"price"} control={control} placeholder={`${productInfo.price.toLocaleString()}원`}/>
                <TextMediumShared isLabel={true} htmlFor={"priceSale"}>할인 가격</TextMediumShared>
                <FormInputShared readOnly={true} name={"priceSale"} control={control} placeholder={`${productInfo.priceSale.toLocaleString()}원`} />
                <TextMediumShared>기존 색상입니다.</TextMediumShared>
                {productInfo.colorType.map((color, index) => (
                    <TextMediumShared key={index}>{color}</TextMediumShared>
                ))}
                <TextMediumShared isLabel={true} htmlFor={"color"}>색상</TextMediumShared>
                <FormInputShared isClearable size="lg" variant="flat" isInvalid={!!errors.color} radius="none" errorMessage={errors.color && <>{errors.color.message}</>} name={"color"} control={control} placeholder="색상을 입력해주세요." />

           
                <TextMediumShared>이미지</TextMediumShared>
                <Button     
                    onClick={_ => {
                        setIsOpen(true);
                    }}
                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                >
                    이미지 등록하기
                </Button>
                <Button fullWidth size={"lg"} type={"submit"} color={"primary"}>등록하기</Button>
            </form>
            {isOpen && <ProductImageCreateModal setIsOpen={setIsOpen} />}
        </>
    );
};

export default ProductColorCreateForm;