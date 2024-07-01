package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ReviewImageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImageEntity, Long>{

    // 제품 상세 페이지 이미지 총 갯수
    @Query("SELECT COUNT(rie) FROM ReviewImageEntity rie WHERE rie.review.products.productId = :productId")
    Long countReviewImagesByProductId(@Param("productId") Long productId);

    // 제품의 전체 후기 사진
    @Query("SELECT rie FROM ReviewImageEntity rie WHERE rie.review.products.productId = :productId")
    List<ReviewImageEntity> findAllReviewImagesByProductId(@Param("productId") Long productId);

}
