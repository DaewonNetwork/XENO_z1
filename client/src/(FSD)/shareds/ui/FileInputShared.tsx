import { Button, ButtonProps } from "@nextui-org/button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import Image from "next/image";
import IconShared from "./IconShared";

interface FileInputSharedProps extends ButtonProps {
    inputId: string;
    setFile: any;
    children?: ReactNode;
}

const FileInputShared = ({ inputId, children, setFile, ...props }: FileInputSharedProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        <div className={styles.file_container}>
            <div className={styles.file_input_box}>
                <input ref={inputRef} onChange={handleFileChange} id={inputId} type={"file"} />
                <Button className={styles.file_btn} {...props}>
                    <label htmlFor={inputId}>{children}</label>
                </Button>
            </div>
            {preview &&
                <div className={styles.preview_img_box}>
                    <div className={styles.preview_img_item}>
                        <div className={styles.preview_img_close_btn}>
                            <Button onClick={handleDeletePreview} variant={"light"} size={"md"} isIconOnly endContent={<IconShared iconType={"close"} />} />
                        </div>
                        <Image src={preview} alt={"preview"} layout="fill" objectFit="contain" />
                    </div>
                </div>
            }
        </div>
    );
};

export default FileInputShared;