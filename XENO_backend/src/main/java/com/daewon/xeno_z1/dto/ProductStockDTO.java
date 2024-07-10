package com.daewon.xeno_z1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductStockDTO {

    private long productColorId;
    private long productColorSizeId;
    private String color;
    private String size;
    private long stock;
}
