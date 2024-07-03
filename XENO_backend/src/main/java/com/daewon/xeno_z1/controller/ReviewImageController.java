package com.daewon.xeno_z1.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.dto.ReviewImageDTO;
import com.daewon.xeno_z1.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("products/{productId}/reviews")
public class ReviewImageController {

    private final ReviewService reviewService;

    @Operation(summary = "전체 이미지 총 갯수")
    @GetMapping("/images/count")
    public ResponseEntity<Long> getReviewImageCount(@PathVariable Long productId) {
        Long count = reviewService.countReviewImagesByProductId(productId);
        return ResponseEntity.ok(count);
    }

    @Operation(summary = "구매자가 올린 사진의 전체 이미지")
    @GetMapping
    public ResponseEntity<List<ReviewImageDTO>> getAllReviewImagesByProductId(@PathVariable Long productId) {
        List<ReviewImage> images = reviewService.findAllReviewImagesByProductId(productId);
        if (images.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<ReviewImageDTO> imageDTOs = images.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(imageDTOs);
    }

    private ReviewImageDTO convertToDTO(ReviewImage reviewImage) {
        return new ReviewImageDTO(
            reviewImage.getReviewImageId(),
            reviewImage.getUuid(),
            reviewImage.getFileName(),
            (int) reviewImage.getOrd()
        );
    }
}
