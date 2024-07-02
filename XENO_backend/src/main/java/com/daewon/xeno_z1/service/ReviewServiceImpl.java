package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsImage;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.ReviewDTO;
import com.daewon.xeno_z1.repository.ProductsImageRepository;
import com.daewon.xeno_z1.repository.ReviewImageRepository;
import com.daewon.xeno_z1.repository.ReviewRepository;
import com.daewon.xeno_z1.repository.UserRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Log4j2
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository usersRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewImageRepository reviewImageRepository;
    private final ProductsImageRepository productsImageRepository;

    @Value("${uploadPath}")
    private String uploadPath;

    // 리뷰 이미지 총 갯수
    @Override
    public Long countReviewImagesByProductId(Long productId) {
        return reviewImageRepository.countReviewImagesByProductId(productId);
    }

    // 제품의 전체 후기 사진
    @Override
    public List<ReviewImage> findAllReviewImagesByProductId(Long productId) {
        return reviewImageRepository.findAllReviewImagesByProductId(productId);
    }

    // 리뷰 조회
    @Override
    public ReviewDTO getReviewDetails(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));

        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setProductId(review.getProducts().getProductId());
        dto.setUserId(review.getUsers().getUserId());
        dto.setText(review.getText());
        dto.setStar((int) review.getStar());
        dto.setReviewDate(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
        dto.setNickname(review.getUsers().getName());
        dto.setProductImage(productsImageRepository.findByProductId(review.getProducts().getProductId())
                .stream().findFirst().map(ProductsImage::getFileName).orElse(null));
        dto.setSize(review.getSize().toString());

        List<String> imageUrls = reviewImageRepository.findByReview(review)
                .stream()
                .map(ReviewImage::getFileName)
                .collect(Collectors.toList());
        dto.setImageUrls(imageUrls);

        return dto;
    }

    // 리뷰 생성
    @Override
    public Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images) {
        // 리뷰 엔티티 생성
        Review review = Review.builder()
                .text(reviewDTO.getText())
                .star(reviewDTO.getStar())
                .products(Products.builder().productId(reviewDTO.getProductId()).build())
                .users(Users.builder().userId(reviewDTO.getUserId()).build())
                .productImage(Long.parseLong(reviewDTO.getProductImage()))
                .size(Long.parseLong(reviewDTO.getSize()))
                .build();

        // 리뷰 저장
        review = reviewRepository.save(review);

        // 이미지 처리
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    // 이미지 파일 저장
                    String originalFilename = image.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String savedName = uuid + extension;
                    String savePath = uploadPath + File.separator + savedName;

                    File dest = new File(savePath);
                    image.transferTo(dest);

                    // ReviewImage 생성 및 저장
                    ReviewImage reviewImage = ReviewImage.builder()
                            .review(review)
                            .fileName(savedName)
                            .uuid(uuid)
                            .build();
                    reviewImageRepository.save(reviewImage);
                } catch (IOException | java.io.IOException e) {
                    throw new RuntimeException("Failed to save image file", e);
                }
            }
        }

        return review;
    }

    @Override
    public Page<ReviewDTO> getReviews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findAll(pageable).map(this::convertToDTO);
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setProductId(review.getProducts().getProductId());
        dto.setUserId(review.getUsers().getUserId());
        dto.setText(review.getText());
        dto.setStar((int) review.getStar());
        dto.setReviewDate(review.getCreateAt().toString());
        dto.setNickname(usersRepository.findById(review.getUsers().getUserId()).get().getName());
        dto.setProductImage(productsImageRepository.findByProductId(review.getProducts().getProductId()).get(0).getFileName());
        dto.setSize(review.getSize().toString());

        // 리뷰 이미지 URL 설정
        List<String> imageUrls = reviewImageRepository.findByReview(review)
                .stream()
                .map(ReviewImage::getFileName)
                .collect(Collectors.toList());
        dto.setImageUrls(imageUrls);

        return dto;
    }
}