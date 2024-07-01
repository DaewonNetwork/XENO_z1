export interface ProductType {
    productId: number;
    productName: string;
    productBrand: string;
    price: number;
    isSale: boolean;
    sale: number;
    productState: string;
    productImage: string | null;
    productCategory: "상의" | "하의" | "아우터";
    productSubCategory: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
}

