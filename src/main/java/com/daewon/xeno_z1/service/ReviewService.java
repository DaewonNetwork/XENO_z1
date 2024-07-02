package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.dto.ReviewDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {

    // 리뷰 이미지 총 갯수
    Long countReviewImagesByProductId(Long productId);

    // 제품의 전체 후기 사진
    List<ReviewImage> findAllReviewImagesByProductId(Long productId);

    // 리뷰 조회
    ReviewDTO getReviewDetails(Long reviewId);

    // 리뷰 생성
    Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images);

}
