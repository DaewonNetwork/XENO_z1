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
public class ReviewDTO {
    private long reviewId; // 리뷰

    private long productId; // 리뷰가 작성된 제품

    private long userId; // 리뷰를 작성한 사용자
    
    private String text; // 리뷰의 내용

    private int star; // 사용자가 제품에 부여한 별점

    private String reviewDate; // 리뷰 작성 날짜

    private List<String> imageUrls; // 사용자가 올린 리뷰 이미지 URL 목록

    private String nickname; // 리뷰 작성자 닉네임

    private String productImage; // 구매한 제품의 이미지

    private String size; // 구매한 제품의 사이즈
}
