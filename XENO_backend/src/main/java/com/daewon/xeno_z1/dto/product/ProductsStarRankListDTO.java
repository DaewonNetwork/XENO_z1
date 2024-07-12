package com.daewon.xeno_z1.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductsStarRankListDTO {

    private Long productId;
    private String productName;
    private String brandName;
    private Long price;
    private Long priceSale;
    private boolean isSale;
    private double starAvg;
    private Long reviewCount;
    private String category;
    private String categorySub;
    private byte[] productImage;
    
}
