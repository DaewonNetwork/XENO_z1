import { Button, ButtonProps } from "@nextui-org/button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import Image from "next/image";
import IconShared from "./IconShared";

interface FileInputSharedProps extends ButtonProps {
    inputId: string;
    setFile: any;
    children?: ReactNode;
    height?: number;
    file?: File | null
}

const FileInputShared = ({ inputId, setFile, height = 160, file}: FileInputSharedProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
            };
            reader.readAsDataURL(file);
            setFile(file);
        }
    }, [file, setFile, setPreview]);




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
        setFile(null);

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

export default FileInputShared;