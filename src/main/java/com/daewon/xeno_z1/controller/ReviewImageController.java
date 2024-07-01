package com.daewon.xeno_z1.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daewon.xeno_z1.domain.ReviewImageEntity;
import com.daewon.xeno_z1.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("api/products/{productId}/reviews")
public class ReviewImageController {

    private ReviewService reviewService;

    @Operation(summary = "전체 이미지 총 갯수")
    @GetMapping("/images/count")
    public ResponseEntity<Long> getReviewImageCount(@PathVariable Long productId) {
        Long count = reviewService.countReviewImagesByProductId(productId);
        return ResponseEntity.ok(count);
    }

    @Operation(summary = "구매자가 올린 사진의 전체 이미지")
    @GetMapping
    public ResponseEntity<List<ReviewImageEntity>> getAllReviewImagesByProductId(@PathVariable Long productId) {
        List<ReviewImageEntity> images = reviewService.findAllReviewImagesByProductId(productId);
        if (images.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }
}
