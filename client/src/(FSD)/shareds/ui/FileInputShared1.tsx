import { Button, ButtonProps } from "@nextui-org/button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import Image from "next/image";
import IconShared from "./IconShared";
import { useRecoilState } from "recoil";
import { detailImageState, imagesState } from "../stores/PreviewAtom";
import { ProductImageInfoType } from "@/(FSD)/features/product/ui/ProductColorUpdateForm";
import { base64toBlob } from "../uitll/base64toBlob";

interface FileInputSharedProps extends ButtonProps {
    inputId: string;
    setFile: any;
    children?: ReactNode;
    height?: number;
    image?: ProductImageInfoType;
    file?: File | null;
    imageId: number;

}



const FileInputShared1 = ({ inputId, setFile, height = 160, imageId, file }: FileInputSharedProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [images, setImages] = useRecoilState(imagesState);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        const imageToUpdate = images.find((img) => img.imageId === imageId);
        if (imageToUpdate && !file && imageToUpdate.productColorImage && imageToUpdate.filename) {
            setPreview(`data:image/jpeg;base64,${imageToUpdate.productColorImage}`);
            const base64String = `data:image/jpeg;base64,${imageToUpdate.productColorImage}`;
            const base64Data = base64String.split(',')[1];
            const mimeType = 'image/jpeg';
            const blob = base64toBlob(base64Data, mimeType);
            const newFile = new File([blob], imageToUpdate.filename, { type: mimeType });
            setFile(newFile);
        }

        if ((!imageToUpdate && file) || (imageToUpdate && file && imageToUpdate.productColorImage && imageToUpdate.filename)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
            };
            reader.readAsDataURL(file);
            setFile(file);

        }
       
    }, [imageId, file, setFile, setPreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setFile(file);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleDeletePreview = () => {
        setPreview(null);
        setFile(undefined);
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            const imageIndex = updatedImages.findIndex((img) => img.imageId === imageId);
            if (imageIndex !== -1) {
                updatedImages.splice(imageIndex, 1);
            }
            return updatedImages;
        });


        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
        }
    };

    return (
        <div style={{ height: height }} className={`${preview ? "" : "bg-content2"} rounded-medium ${styles.file_container}`}>
            {
                !preview &&
                <div className={styles.file_input_box}>
                    <input ref={inputRef} onChange={handleFileChange} id={inputId} type={"file"} />
                    <label htmlFor={inputId}>
                        <IconShared iconType={"plus"} iconSize={"lg"} />
                    </label>
                </div>
            }
            {
                preview &&
                <div className={styles.preview_img_box}>
                    <div className={styles.preview_img_close_btn}>
                        <Button onClick={handleDeletePreview} variant={"light"} size={"sm"} isIconOnly endContent={<IconShared iconType={"close"} />} />
                    </div>
                    <Image src={preview} alt={"preview"} layout="fill" objectFit="contain" />
                </div>
            }
        </div>
    );
};





export default FileInputShared1;