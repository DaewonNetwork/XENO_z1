package com.daewon.xeno_z1.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddToCartDTO {

    private Long productColorSizeId;

    private Long userId;

    private Long quantity;  // 수량

    private Long price;

}
