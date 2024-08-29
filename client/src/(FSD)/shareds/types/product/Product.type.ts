// export interface ProductType {
//     productId: number;
//     name: string;
//     brandName: string;
//     price: number;
//     isSale: boolean;
//     priceSale: number;
//     productState: string;
//     like: boolean;
//     productImage: Uint8Array | null;
//     category: "상의" | "하의" | "아우터";
//     categorySub: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
// }


export interface ProductType {
    productId: number;
    brandName: string;
    name: string;
    category: "상의" | "하의" | "아우터";
    categorySub: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
    price: number;
    priceSale: number;
    sale: boolean;
    like: boolean;
    // likeIndex: number;
    // starAvg: number;
    productState: string;
    productImage: Uint8Array | null;
    color?: string;
}




