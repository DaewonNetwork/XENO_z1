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
public class ProductRegisterColorDTO {

    private String colors; // 색상

    private List<ProductSizeDTO> size; // size 리스트
}
