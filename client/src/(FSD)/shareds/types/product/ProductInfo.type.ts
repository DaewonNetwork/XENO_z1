
export interface ProductInfoType {
  productId: number;
  productColorId: number;
  otherProductColorId: number[];
  name: string;
  brandName: string;
  price: number;
  sale: boolean;
  priceSale: number;
  productNumber: string;
  season: string;
  starAvg: number;
  likeIndex: number;
  reviewIndex: number;
  booleanColor: boolean;
  color: string;
  colorType: string[];
  productImages: Uint8Array[];
  productColorImages: Uint8Array[];
  category: "상의" | "하의" | "아우터";
  categorySub: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
}

export interface ProductCreateGetInfoType {
    name: string;
    brandName: string;
    price: number;
    sale: boolean;
    priceSale: number;
    productNumber: string;
    season: string;
    colorType: string[];
    category: "상의" | "하의" | "아우터";
    categorySub: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
  }







