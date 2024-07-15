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

//상품수정 기능
//
//상품 이름 수정
//상품 대표 이미지, 상세 이미지 수정
//가격 수정
//할인 여부 수정
//할인 가격 수정
//상품 카테고리 수정
//상품 상세 카테고리 수정
//상품 색상에 해당하는 사이즈 수정
//상품 색상에 해당하고 사이즈에 해당하는 재고 수 수정
