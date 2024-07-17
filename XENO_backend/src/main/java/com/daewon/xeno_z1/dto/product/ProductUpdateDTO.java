package com.daewon.xeno_z1.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateDTO {

    private Long productId;
    private String name;
    private String season;
    private String productNumber;
    private Long price;
    private boolean sale;
    private Long priceSale;
    private String category;
    private String categorySub;
}

