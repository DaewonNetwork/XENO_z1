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
public class ProductCreateDTO {

    private String productName;
    private String brandName;
    private Long price;
    private boolean isSale;
    private Long priceSale;
    private String category;
    private String categorySub;
    private String season;

    private List<List<MultipartFile>> productImages;
    private List<List<MultipartFile>> productDetailImages;

    private List<String> colors; // 색상
    private List<String> size; // size 리스트
    private List<Long> stock;
}

//상품등록 기능
//
//상품 이름 입력
//상품 대표 이미지, 상세 이미지 등록
//브랜명 입력
//가격 등록
//할인 여부 버튼
//할인 가격
//상품 카테고리 입력
//상품 상세 카테고리 입력
//상품 색상 입력
//상품 색상에 해당하는 사이즈 입력
//상품 색상에 해당하고 사이즈에 해당하는 재고 입력
