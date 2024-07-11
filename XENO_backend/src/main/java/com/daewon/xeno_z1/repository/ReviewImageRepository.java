package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsImage;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {

    ReviewImage findByReview(Review review);

    @Transactional
    @Modifying
    @Query("DELETE FROM ReviewImage r WHERE r.review.reviewId = :reviewId")
    void deleteByReviewId(Long reviewId);

}