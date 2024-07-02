package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Review;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{


    long countByProductsProductId(Long productId); // 리뷰 작성한 수
}