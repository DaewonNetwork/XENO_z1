package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewRepository extends JpaRepository<Review, Long>{


    long countByProductsProductId(Long productId); // 리뷰 작성한 수
}