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
import { useRecoilValue } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { Input } from "@nextui-org/input";
import { useProductColorSizeStockRead } from "@/(FSD)/entities/product/api/useProductColorSizeStockRead";
import { useProductColorUpdate } from "../api/useProductColorUpdate";
import ProductImageUpdateModal from "./ProductImageUpdateModal";




interface SizeStocksType {
    id: number;
    size: string;
    stock: number;
}

interface ProductColorSizeType {
    color: string;
    size: {
        size: string;
        stock: number;
    }[]
    image: Uint8Array
    fileName: string;
}


const ProductColorUpdateForm = () => {

    const { productColorId } = useParams<{ productColorId: string }>();


    const { data } = useProductColorSizeStockRead(+productColorId)

    const productImages = useRecoilValue(productImagesState);
    const productDetailImage = useRecoilValue(productDetailImageState);



    const [sizeStocks, setSizeStocks] = useState<SizeStocksType[]>([]);
    const sizeArray = ["S", "M", "L", "XL"];

    useEffect(() => {
        console.log(data)
        if (data) {
            const sizeStocksNew: SizeStocksType[] = data.size.map((item:SizeStocksType, index:number) => ({
                id: index + 1,
                size: item.size,
                stock: item.stock
            }));
            setSizeStocks(sizeStocksNew);
        }
    }, [data]);

    const productInfo: ProductColorSizeType = data;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const schema = z.object({

    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSuccess = (data: any) => {
        console.log("성공")
    }

    const { mutate } = useProductColorUpdate({ onSuccess });

    const onSubmit = (data: any) => {
        const formData = new FormData();
        const sizeStocksToSend = sizeStocks.map(({ id, ...rest }) => rest);
        console.log(sizeStocksToSend)
        
        formData.append("productColorUpdateDTO", JSON.stringify({ productColorId: productColorId, size: sizeStocksToSend }));
        console.log(formData.get("productColorUpdateDTO"))
        mutate(formData);
    }

    if (!data) return <></>

  
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


    const isSizeStockValid: boolean = sizeStocks.length === 0 || sizeStocks.some(item => !item.size || item.stock === 0);

    return (
        <>
            <form style={{ display: isOpen ? "none" : "block" }} className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                <TextMediumShared isLabel={true} htmlFor={"color"}>색상</TextMediumShared>
                <FormInputShared isClearable readOnly={true} name={"color"} control={control} placeholder={productInfo.color}  />
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
                            placeholder={sizeStock.size}
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
                            defaultValue={String(sizeStock.stock)}
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
                    이미지 수정하기
                </Button>
                <Button isDisabled={(!isValid) || (isSizeStockValid)} fullWidth size={"lg"} type={"submit"}>수정하기</Button>
                <Button fullWidth size={"lg"} type={"submit"} >삭제하기</Button>
            </form>
            {isOpen && <ProductImageUpdateModal image={productInfo.image} fileName={productInfo.fileName} setIsOpen={setIsOpen} />}
        </>
    );
};

export default ProductColorUpdateForm;