package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ReviewImage;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {

    // 제품 상세 페이지 이미지 총 갯수
    @Query("SELECT COUNT(rie) FROM ReviewImageEntity rie WHERE rie.review.products.productId = :productId")
    Long countReviewImagesByProductId(@Param("productId") Long productId);

    // 제품의 전체 후기 사진
    @Query("SELECT rie FROM ReviewImageEntity rie WHERE rie.review.products.productId = :productId")
    Page<ReviewImage> findReviewImagesByProductId(@Param("productId") Long productId, Pageable pageable);

}
