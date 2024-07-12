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
public class ProductOrderBarDTO {


    private boolean isLike;
    private long likeIndex;
    private List<ProductStockDTO> orderInfo;
    private long price;

}
