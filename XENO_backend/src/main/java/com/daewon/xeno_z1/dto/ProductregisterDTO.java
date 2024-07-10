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

    private String category;

    private String category_sub;

    private String name;
    
    private Long price;

    private boolean is_sale;

    private Long price_sale;

    private String products_number;

    private String season;

    private List<String> colors; // 색상

    private List<String> size; // size 리스트

    private List<byte[]> productImage;
    
    private List<byte[]> productDetailImages;

}
