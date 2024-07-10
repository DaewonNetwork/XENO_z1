package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.dto.page.PageRequestDTO;
import com.daewon.xeno_z1.dto.page.PageResponseDTO;
import com.daewon.xeno_z1.dto.review.ReviewCardDTO;
import com.daewon.xeno_z1.dto.review.ReviewDTO;

import java.io.IOException;
import java.util.List;

import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {

    // 리뷰 이미지 총 갯수
//    Long countReviewImagesByProductId(Long productId);

    PageResponseDTO<ReviewCardDTO> readAllReviewImageList(PageRequestDTO pageRequestDTO);

    List<Map<String, Object>> getAllReviewImages();

    // 리뷰 조회
//    ReviewDTO getReviewDetails(Long reviewId);

    // 리뷰 생성
    Review createReview(ReviewDTO reviewDTO, MultipartFile image);

    // 리뷰 페이지네이션
//    Page<ReviewDTO> getReviews(int page, int size);

    // 리뷰 수정
//    Review updateReview(Long reviewId, ReviewDTO reviewDTO, List<MultipartFile> newImages) throws IOException;

    // 리뷰 삭제
//    void deleteReview(Long reviewId);

}