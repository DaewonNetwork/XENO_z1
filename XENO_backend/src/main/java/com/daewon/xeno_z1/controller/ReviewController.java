package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.repository.ProductsImageRepository;
import com.daewon.xeno_z1.repository.ReviewImageRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.daewon.xeno_z1.domain.ProductsImage;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.ReviewDTO;
import com.daewon.xeno_z1.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewImageRepository reviewImageRepository;
    private final UserRepository userRepository;
    private final ProductsImageRepository productsImageRepository;

    @PostMapping
    public ResponseEntity<Page<ReviewDTO>> getReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReviewDTO> reviews = reviewService.getReviews(page, size);
        return ResponseEntity.ok(reviews);
    }

    @Operation(summary = "리뷰 조회")
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> getReviewDetails(@PathVariable Long reviewId) {
        try {
            ReviewDTO reviewDTO = reviewService.getReviewDetails(reviewId);
            return ResponseEntity.ok(reviewDTO);
        } catch (RuntimeException e) {
            log.error("Error fetching review details: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    @Operation(summary = "리뷰 생성")
    public ResponseEntity<?> createReview(
            @RequestPart(name = "reviewDTO") String reviewDTOStr,
            @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        log.info("Review DTO String: " + reviewDTOStr);
        log.info("Images: " + images);

        ReviewDTO reviewDTO;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            String decodedReviewDTO = URLDecoder.decode(reviewDTOStr, StandardCharsets.UTF_8.name());
            reviewDTO = objectMapper.readValue(decodedReviewDTO, ReviewDTO.class);
            log.info("Original reviewDTOStr: " + reviewDTOStr);
            log.info("Decoded reviewDTOStr: " + decodedReviewDTO);
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
        }

        try {
            Review createdReview = reviewService.createReview(reviewDTO, images);
            return ResponseEntity.ok(createdReview);
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request", e);
        }
    }

    @PutMapping(value = "/{reviewId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "리뷰 수정")
    public ResponseEntity<?> updateReview(
            @PathVariable Long reviewId,
            @RequestPart(name = "reviewDTO") String reviewDTOStr,
            @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        ReviewDTO reviewDTO;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            String decodedReviewDTO = URLDecoder.decode(reviewDTOStr, StandardCharsets.UTF_8.name());
            reviewDTO = objectMapper.readValue(decodedReviewDTO, ReviewDTO.class);
        } catch (IOException e) {
            log.error("Error parsing reviewDTO", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
        }
    
        try {
            Review updatedReview = reviewService.updateReview(reviewId, reviewDTO, images);
            ReviewDTO responseDTO = convertToDTO(updatedReview);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            log.error("Error updating review", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating review", e);
        }
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setProductId(review.getProducts().getProductId());
        dto.setUserId(review.getUsers().getUserId());
        dto.setText(review.getText());
        dto.setStar((int) review.getStar());
        dto.setReviewDate(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
        dto.setSize(review.getSize().toString());

        // 리뷰 이미지 URL 설정
        List<String> imageUrls = reviewImageRepository.findByReview(review)
                .stream()
                .map(ReviewImage::getFileName)
                .collect(Collectors.toList());
        dto.setImageUrls(imageUrls);

        // 사용자 이름과 제품 이미지는 서비스 계층에서 가져옵니다.
        dto.setNickname(userRepository.findById(review.getUsers().getUserId()).map(Users::getName).orElse(null));
        dto.setProductImage(productsImageRepository.findByProductColorId(review.getProducts().getProductId())
                .stream().findFirst().map(ProductsImage::getFileName).orElse(null));

        return dto;
    }

    // 리뷰 삭제
    @DeleteMapping("/{reviewId}")
    @Operation(summary = "리뷰 삭제")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok().body("리뷰 삭제 완료");
        }  catch (RuntimeException e) {
            log.error("리뷰 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}