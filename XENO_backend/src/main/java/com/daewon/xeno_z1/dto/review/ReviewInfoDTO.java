package com.daewon.xeno_z1.dto.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewInfoDTO {

    private String productName;
    private long price;
    private int saleRate;

}
