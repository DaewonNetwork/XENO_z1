package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long>{


    long countByProductsProductId(Long productId); // 리뷰 작성한 수
}