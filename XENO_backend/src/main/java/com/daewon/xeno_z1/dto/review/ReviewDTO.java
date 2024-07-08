package com.daewon.xeno_z1.dto.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsColorSize;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private long reviewId; // 리뷰

    private long productId; // 상품 테이블의 외래 키로, 어떤 상품인지를 나타냅니다.

    private String productName;

    // private Long productColorId; // 상품 색상 테이블의 외래 키로, 리뷰가 참조하는 상품의 색상을 나타냅니다.

    private long userId; // 리뷰를 작성한 사용자

    private String text; // 리뷰의 내용

    private double star; // 사용자가 제품에 부여한 별점

    private String reviewDate; // 리뷰 작성 날짜

    private String name; // 리뷰 작성자 닉네임

    private String size;

    private String color;

    private List<byte[]> productImages;
    private List<byte[]> reviewDetailImages;

    // ProductsColor 관련 필드
    private Long productColorId;
    // ProductsColorSize 관련 필드
    private Long productColorSizeId;
}