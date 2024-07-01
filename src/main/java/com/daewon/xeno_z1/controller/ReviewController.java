package com.daewon.xeno_z1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.dto.ReviewDTO;
import com.daewon.xeno_z1.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> getReviewDetails(@PathVariable Long reviewId) {
        try {
            ReviewDTO reviewDTO = reviewService.getReviewDetails(reviewId);
            return ResponseEntity.ok(reviewDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

     @PostMapping(
         consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
         produces = MediaType.APPLICATION_JSON_VALUE
     )
     @Operation(summary = "리뷰 생성")
     public ResponseEntity<?> createReview(
         @RequestPart("reviewDTO") String reviewDTOStr,
         @RequestPart(name = "images", required = false) List<MultipartFile> images) {
         log.info("Review DTO String: " + reviewDTOStr);
         log.info("Images: " + images);

         ReviewDTO reviewDTO;
         try {
             ObjectMapper objectMapper = new ObjectMapper();
             String decodedReviewDTO = new String(reviewDTOStr.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
             reviewDTO = objectMapper.readValue(decodedReviewDTO, ReviewDTO.class);
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

}