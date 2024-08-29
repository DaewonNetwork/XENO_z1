
export interface ProductInfoType {
  productId: number;
  productId: number;
  otherproductId: number[];
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
  url_1: string;
  url_2: string;
  url_3: string;
  url_4: string;
  url_5: string;
  url_6: string;
  detail_url: string;
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







