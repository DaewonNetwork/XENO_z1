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
import { useRecoilState, useRecoilValue } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { Input } from "@nextui-org/input";
import { useProductColorSizeStockRead } from "@/(FSD)/entities/product/api/useProductColorSizeStockRead";
import { useProductColorUpdate } from "../api/useProductColorUpdate";
import ProductImageUpdateModal from "./ProductImageUpdateModal";
import { detailImageState, imagesState } from "@/(FSD)/shareds/stores/PreviewAtom";
import { useProductColorDelete } from "../api/useProductColorDelete";

interface SizeStocksType {
    id: number;
    size: string;
    stock: number;
}

export interface ProductImageInfoType {
    imageId: number;
    productColorImage: Uint8Array | null;
    filename: string | null;
}

interface ProductColorSizeType {
    color: string;
    size: {
        size: string;
        stock: number;
    }[];
    images: ProductImageInfoType[];
    detailImage: ProductImageInfoType;
}

const ProductColorUpdateForm = () => {

    const { productColorId } = useParams<{ productColorId: string }>();
    const { data } = useProductColorSizeStockRead(+productColorId)
    const productImages = useRecoilValue(productImagesState);
    const productDetailImage = useRecoilValue(productDetailImageState);
    const [images,setImages] = useRecoilState(imagesState)
    const [detailImage,setDetailImage] =useRecoilState(detailImageState)
    const [sizeStocks, setSizeStocks] = useState<SizeStocksType[]>([]);
    const router = useRouter();
    const sizeArray = ["S", "M", "L", "XL"];

    useEffect(() => {
        if (data) {
            const sizeStocksNew: SizeStocksType[] = data.size.map((item:SizeStocksType, index:number) => ({
                id: index + 1,
                size: item.size,
                stock: item.stock
            }));
            setSizeStocks(sizeStocksNew);
            if (data.images && data.detailImage && data.images.length > 0) {
                const imagesWithId = data.images.map((image: any, index: number) => ({
                    ...image,
                    imageId: index + 1, 
                }));
                setImages(imagesWithId); 
            }
            if(data.detailImage && !detailImage.filename ) {
                setDetailImage(data.detailImage)
            }
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
        router.push('/seller')
    }

    const { mutate } = useProductColorUpdate({ onSuccess });
    const { mutate:deleteProductColor } = useProductColorDelete({ onSuccess });

    const onSubmit = (data: any) => {
        const formData = new FormData();
        const sizeStocksToSend = sizeStocks.map(({ id, ...rest }) => rest);
        formData.append("productColorUpdateDTO", JSON.stringify({ productColorId: productColorId, size: sizeStocksToSend }));
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
                <Button isDisabled={(!isValid) || (!productImages) || (!productDetailImage)} fullWidth size={"lg"} type={"submit"}>수정하기</Button>
                <Button fullWidth size={"lg"} onClick={() => deleteProductColor(+productColorId)} >삭제하기</Button>
            </form>
            {isOpen && <ProductImageUpdateModal setIsOpen={setIsOpen} files={productImages} detailFile={productDetailImage} />}
        </>
    );
};

const compareUint8Arrays = (arr1: Uint8Array, arr2: Uint8Array): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

export default ProductColorUpdateForm;