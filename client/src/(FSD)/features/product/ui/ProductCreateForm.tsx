"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import ProductImageCreateModal from "./ProductImageCreateModal";
import { useRecoilState } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { ProductCreateResponse, useProductCreate } from "../api/useProductCreate";
import { useRouter } from "next/navigation";
import ProductImageCheckModal from "@/(FSD)/entities/product/ui/ProductImageCheckModal";
import { download, newDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";



export interface ImageListType {
    productNumber: string;
    url_1: string;
    url_2: string;
    url_3: string;
    url_4: string;
    url_5: string;
    url_6: string;
    detailUrl: string;
}
const ProductCreateForm = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [checkOpen, setCheckOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [formBlocks, setFormBlocks] = useState<number[]>([1]); // 초기 블록 하나 추가
    const [submissionStatus, setSubmissionStatus] = useState<Map<number, boolean>>(new Map()); // 상태를 추적하는 맵
    const [imageList, setImageList] = useState<ImageListType[]>([])

    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
        resolver: zodResolver(z.object({ productNumber: z.string() })),
        mode: "onChange"
    });

    const [productImages, setProductImages] = useRecoilState(productImagesState);
    const [productDetailImage, setProductDetailImage] = useRecoilState(productDetailImageState);
    const [excelFile, setExcelFile] = useState<File | null>(null);


    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };

    const { mutate } = useProductCreate({
        onSuccess: (index) => {
            alert(`${index + 1} 번째 블록이 성공적으로 업로드되었습니다!`);
        },
        onError: () => {
            alert("블록 업로드에 실패했습니다.");
        },
    });

    const onSubmit = async () => {
        const promises = formBlocks.map((_, i) => {
            const formData = new FormData();
            const productNumber = getValues(`productNumber-${i}`); // 각 블록의 productNumber 가져오기

            formData.append("productNumber", productNumber);

            // 각 블록의 이미지들을 FormData에 추가
            productImages[i]?.forEach((image: File) => {
                if (image) {
                    formData.append(`productImages`, image);
                }
            });

            if (productDetailImage[i]) {
                formData.append(`productDetailImage`, productDetailImage[i]);
            }

            // mutate 호출 시 FormData와 인덱스를 함께 전달
            return new Promise<number>((resolve, reject) => {
                mutate({ formData, index: i }, {
                    onSuccess: (data: ProductCreateResponse) => {
                        resolve(data.index); // 성공 시 인덱스를 반환
                    },
                    onError: () => {
                        reject(i); // 실패 시 인덱스를 반환
                    },
                });
            });
        });

        try {
            const results = await Promise.all(promises);
            // 모든 mutate 호출이 성공적으로 완료됨
            results.forEach((index) => {
                alert(`${index + 1} 번째 블록이 성공적으로 업로드되었습니다!`);
            });
        } catch (error) {
            // 하나 이상의 mutate 호출이 실패했을 때
            alert("블록 업로드에 실패했습니다.");
        }
    };

    const accessToken = localStorage.getItem("access_token");

    const addFormBlock = () => {
        setFormBlocks([...formBlocks, formBlocks.length + 1]);
    };
    const handleExcelUpload = async () => {
        if (!excelFile) {
            alert('엑셀 파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('excel', excelFile);

        try {
            const response = await fetch("http://localhost:8090/api/product/create", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                alert('엑셀 파일 업로드 성공');
                window.location.reload();
            } else {
                const errorText = await response.text();
                alert(`업로드 실패: ${errorText}`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('엑셀 파일 업로드 중 오류가 발생했습니다.');
        }
    };

   


    return (
        <>
            {formBlocks.map((block, idx) => (
                <form key={idx} style={{ display: isOpen && idx === formBlocks.length - 1 ? "none" : "block" }} className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                    <TextMediumShared isLabel={true} htmlFor={`productNumber-${idx}`}>품번</TextMediumShared>
                    <FormInputShared
                        isClearable
                        size={"lg"}
                        variant={"flat"}
                        isInvalid={!!errors[`productNumber-${idx}`]}
                        radius={"none"}
                        errorMessage={errors[`productNumber-${idx}`] && <>{errors[`productNumber-${idx}`]?.message}</>}
                        name={`productNumber-${idx}`}
                        control={control}
                        placeholder={"품번을 입력해주세요."}

                    />
                    <TextMediumShared>이미지</TextMediumShared>
                    <Button
                        onClick={() => {
                            setIsOpen(true);
                            setIndex(idx);
                        }}
                        fullWidth size={"lg"} type={"button"} variant={"ghost"}
                    >
                        이미지 등록하기
                    </Button>
                    {idx === formBlocks.length - 1 && (
                        <Button
                            fullWidth size={"lg"} type={"button"} variant={"ghost"}
                            onClick={addFormBlock}
                        >
                            추가 이미지
                        </Button>
                    )}
                </form>
            ))}
            <br></br>

            {isOpen && (
                <ProductImageCreateModal
                    setIsOpen={setIsOpen}
                    files={productImages[index] || []}
                    detailFile={productDetailImage[index] || null}
                    index={index}
                />
            )}

            {checkOpen && (
                <ProductImageCheckModal
                    setCheckOpen={setCheckOpen}

                />
            )}

            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"}
                type={"button"} color={"primary"}
                onClick={onSubmit} // 모든 폼 블록을 한 번에 제출
            >
                이미지 업로드하기
            </Button>
            <br />
            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"} type={"button"} variant={"ghost"}
                onClick={() => setCheckOpen(true)} // 모든 폼 블록을 한 번에 제출
            >
                업로드한 이미지 조회하기
            </Button>
            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"} type={"button"} variant={"ghost"}
                onClick={() => newDownload()} 
            >
                새 엑셀 템플릿 다운받기
            </Button>
            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"} type={"button"} variant={"ghost"}
                onClick={() => download()}
            >
                나의 상품 목록 엑셀 다운받기
            </Button>

            <div>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelFileChange}
                />
                <Button onClick={handleExcelUpload}>엑셀 등록하기</Button>
            </div>
        </>
    );
};

export default ProductCreateForm;
