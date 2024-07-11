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
public class ProductregisterDTO {

    private long productId;

    private String brand_name;

    private String category; // 카테고리

    private String category_sub;

    private String name; // 상품명
    
    private Long price; // 상품 가격

    private boolean is_sale; // 세일 여부

    private Long price_sale; // 세일 가격

    private String products_number; // 품번

    private String season;

    private List<String> colors; // 색상

    private List<String> size; // size 리스트

}
