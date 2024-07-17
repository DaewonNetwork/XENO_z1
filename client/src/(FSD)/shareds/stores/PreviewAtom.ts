import { ProductImageInfoType } from "@/(FSD)/features/product/ui/ProductColorUpdateForm";
import { atom } from "recoil";


  export const imagesState = atom<ProductImageInfoType[]>({
    key: 'imagesState',
    default: []
  });

  export const detailImageState = atom<ProductImageInfoType>({
    key: 'detailImageState',
    default: {
        imageId:1,
      productColorImage: null,
      filename: null,
    },
  });