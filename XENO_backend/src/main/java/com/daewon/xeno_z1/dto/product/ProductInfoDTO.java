package com.daewon.xeno_z1.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductInfoDTO {

    private long productId;

    private long productColorId;

    private String brandName;

    private String name;

    private String category;

    private String categorySub;

    private long price;

    private long priceSale;

    private boolean isSale;

    private String productNumber;

    private String season;

    private double starAvg;

    private long likeIndex;

    private long reviewIndex;

    private boolean booleanColor;

    private boolean isLike;

    private String color;

    private List<String> colorType;

    private List<byte[]> productImages;







}