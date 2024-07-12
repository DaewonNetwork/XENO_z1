package com.daewon.xeno_z1.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateDTO {

    private String productName;
    private List<MultipartFile> productImages;
    private List<MultipartFile> productDetailImages;
    private Long price;
    private boolean isSale;
    private String priceSale;
    private String category;
    private String categorySub;
    private List<String> size; // size 리스트
    private List<Long> stock;
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
