package com.daewon.xeno_z1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRegisterDTO {

    private long productId;

    private String brandName;

    private String category;

    private String categorySub;

    private String name;
    
    private Long price;

    private boolean isSale;

    private Long priceSale;

    private String productsNumber;

    private String season;

    private List<String> colors; // 색상

    private List<ProductSizeDTO> size; // size 리스트


}
