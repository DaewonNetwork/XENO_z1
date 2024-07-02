import { useParams } from "next/navigation";
import { useProductDetailRead } from "../api/useProductDetailRead";
import ProductDetailImagesList from "@/(FSD)/widgets/product/ui/ProductDetailImagesList";


const ProductDetailImages = ({productId}:{productId:string})=> {

    const { data, isError, error, isPending, refetch } = useProductDetailRead(Number(productId));

    const productDetailImages: Uint8Array[] = data;

return (
    <>
    <ProductDetailImagesList productDetailImages={productDetailImages}/>
    </>
)
}

export default ProductDetailImages;