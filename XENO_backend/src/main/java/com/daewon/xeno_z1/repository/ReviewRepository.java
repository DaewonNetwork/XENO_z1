package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productsColor.products.productId = :productId")
    long countReviewImagesByProductId(@Param("productId") Long productId); // 작성한 리뷰 수
}