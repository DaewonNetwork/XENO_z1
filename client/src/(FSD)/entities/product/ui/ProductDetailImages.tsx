'use client'

import { useEffect, useState } from "react";
import { useProductDetailRead } from "../api/useProductDetailRead";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import ProductImageSkeleton from "@/(FSD)/shareds/ui/ProductImageSkeleton";
import { Button } from "@nextui-org/button";

interface Props {
    productId: string;
}

const ProductDetailImages = ({ productId }: Props) => {
    const [size, setSize] = useState(2);
    const [isOpen, setIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { data, isError, error, isPending, refetch } = useProductDetailRead(Number(productId), size);

    useEffect(() => {
        refetch();
        console.log("불러오기");
    }, [size]);

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (isPending || !data) {
        return (
            <div className={style.product_detail_images}>
                <div className={style.product_detail_slide_list}>
                    {[...Array(size)].map((_, index) => (
                        <ProductImageSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    const images: Uint8Array[] = data.productImages.content || [];
    const totalImagesCount: number = data.imagesCount || 0;

    const handleLoadMore = () => {
        if (!isOpen) {
            setIsOpen(true);
            if (!loaded) {
                setSize(totalImagesCount);
                setLoaded(true);
            }
        } else {
            setIsOpen(false);
            setSize(2);
            setLoaded(false);
        }
    };

    return (
        <div>
            <div className={`${style.product_detail_images_list} ${isOpen ? style.expanded : style.collapsed}`}>
                {images.map((image, index) => (
                    <div className={style.image_block} key={index}>
                        <img
                            src={`data:image/jpeg;base64,${image}`}
                            alt={`제품 이미지 ${index + 1}`}
                            className={style.detail_image}
                        />
                    </div>
                ))}
            </div>
            <div className={style.gradient_overlay_block}>
            {!isOpen && <div className={style.gradient_overlay}></div>}
            </div>
            <div className={style.product_load_more}>
                <Button className={style.load_more_button} onClick={handleLoadMore}>
                    {isOpen ? '접기' : '더 보기'}
                </Button>
            </div>
            <div className={style.block} />
        </div>
    );
};

export default ProductDetailImages;
