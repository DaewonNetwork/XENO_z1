package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.review.ReviewDTO;
import com.daewon.xeno_z1.repository.*;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import java.util.Map;
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
    private final ProductsColorSizeRepository productsColorSizeRepository;
    private final CartRepository cartRepository;
    private final OrdersRepository ordersRepository;

    @Value("${uploadPath}")
    private String uploadPath;

    public byte[] getImage(String uuid, String fileName) throws IOException, java.io.IOException {
        String filePath = uploadPath + uuid + "_" + fileName;
        // 파일을 바이트 배열로 읽기
        Path path = Paths.get(filePath);
        byte[] image = Files.readAllBytes(path);
        return image;
    }

    // 리뷰 이미지 총 갯수
    @Override
    public Long countReviewImagesByProductId(Long productId) {
        return reviewImageRepository.countReviewImagesByProductId(productId);
    }

    @Override
    public List<byte[]> getAllProductReviewImages(Long productId) {
        List<ReviewImage> reviewImages = reviewImageRepository.findAllReviewImagesByProductId(productId);
        List<byte[]> imageBytesList = new ArrayList<>();
        for (ReviewImage reviewImage : reviewImages) {
            try {
                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
                imageBytesList.add(imageData);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading review image file", e);
            }
        }
        return imageBytesList;
    }

    @Override
    public List<Map<String, Object>> getAllReviewImages() {
        List<ReviewImage> reviewImages = reviewImageRepository.findAll();
        List<Map<String, Object>> imageList = new ArrayList<>();
        for (ReviewImage reviewImage : reviewImages) {
            try {
                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
                Map<String, Object> imageMap = new HashMap<>();
                imageMap.put("reviewId", reviewImage.getReview().getReviewId());
                imageMap.put("image", imageData);
                imageList.add(imageMap);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading review image file", e);
            }
        }
        return imageList;
    }


    // 리뷰 조회
    @Override
    public ReviewDTO getReviewDetails(Long reviewId) {
        log.info("Getting review details for reviewId: {}", reviewId);
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));
        log.info("Found review: {}", review);
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setProductId(review.getProducts().getProductId());
        dto.setProductName(review.getProducts().getName());
        dto.setUserId(review.getUsers().getUserId());
        dto.setText(review.getText());
        dto.setStar(review.getStar());
        dto.setOrderId(review.getOrder().getOrderId());
        dto.setReviewDate(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
        dto.setName(review.getUsers().getName());
        dto.setProductColorSizeId(review.getProductsColorSize().getProductColorSizeId());

        List<ReviewImage> reviewImages = reviewImageRepository.findByReview(review);
        List<byte[]> reviewDetailImages = new ArrayList<>();
        for (ReviewImage reviewImage : reviewImages) {
            try {
                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
                reviewDetailImages.add(imageData);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading review image file", e);
            }
        }
        dto.setReviewDetailImages(reviewDetailImages);

        // 제품 이미지 설정
         List<ProductsImage> productImages = productsImageRepository.findByProductColorId(review.getProducts().getProductId());
         List<byte[]> productImageBytes = new ArrayList<>();
         for (ProductsImage productImage : productImages) {
             try {
                 byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
                 productImageBytes.add(imageData);
             } catch (IOException | java.io.IOException e) {
                 log.error("Error reading product image file", e);
             }
         }
         dto.setProductImages(productImageBytes);

        return dto;
    }

    // 리뷰 생성
    @Override
    public Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images) {
        ProductsColorSize productsColorSize = productsColorSizeRepository.findById(reviewDTO.getProductColorSizeId())
                .orElseThrow(() -> new RuntimeException("ProductColorSize not found"));

        Orders order = ordersRepository.findByOrderId(reviewDTO.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        ProductsColor productsColor = productsColorSize.getProductsColor();
        
        Products products = productsColor.getProducts();

        ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(productsColor.getProductColorId());
                // .orElseThrow(() -> new RuntimeException("ProductImage not found"));

        Review review = Review.builder()
                .text(reviewDTO.getText())
                .star(reviewDTO.getStar())
                .size(reviewDTO.getSize())
                .productsColorSize(productsColorSize)
                .productsColor(productsColor)
                .products(products)
                .order(order)
                .productsImage(productsImage)
                .users(Users.builder().userId(reviewDTO.getUserId()).build())
                .build();

        review = reviewRepository.save(review);

        List<byte[]> reviewDetailImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    String originalFilename = image.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    String savedName = uuid + "_" + originalFilename;
                    String savePath = uploadPath + File.separator + savedName;

                    File dest = new File(savePath);
                    image.transferTo(dest);

                    ReviewImage reviewImage = ReviewImage.builder()
                            .review(review)
                            .fileName(originalFilename)
                            .uuid(uuid)
                            .build();
                    reviewImageRepository.save(reviewImage);

                    byte[] imageData = Files.readAllBytes(dest.toPath());
                    reviewDetailImages.add(imageData);
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
        dto.setUserId(review.getUsers().getUserId());
        dto.setText(review.getText());
        dto.setStar(review.getStar());
        dto.setReviewDate(review.getCreateAt().toString());
        dto.setName(usersRepository.findById(review.getUsers().getUserId()).get().getName());
        dto.setSize(String.valueOf(review.getProductsColorSize().getSize()));

        // ProductsColorSize 관련 필드 설정
        dto.setProductColorSizeId(review.getProductsColorSize().getProductColorSizeId());

        // 리뷰 이미지 설정
        List<ReviewImage> reviewImages = reviewImageRepository.findByReview(review);
        List<byte[]> reviewDetailImages = new ArrayList<>();

        for (ReviewImage reviewImage : reviewImages) {
            try {
                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
                reviewDetailImages.add(imageData);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading review image file", e);
            }
        }
        dto.setReviewDetailImages(reviewDetailImages);
        return dto;
    }

    // 리뷰 수정
    @Override
    public Review updateReview(Long reviewId, ReviewDTO reviewDTO, List<MultipartFile> newImages) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));

        review.setText(reviewDTO.getText());
        review.setStar(reviewDTO.getStar());

        List<ReviewImage> oldImages = reviewImageRepository.findByReview(review);
        for (ReviewImage oldImage : oldImages) {
            String filePath = uploadPath + File.separator + oldImage.getUuid() + "_" + oldImage.getFileName();
            try {
                Files.deleteIfExists(Paths.get(filePath));
            } catch (IOException | java.io.IOException e) {
                log.error("Failed to delete old image file: " + filePath, e);
            }
            reviewImageRepository.delete(oldImage);
        }

        List<byte[]> reviewDetailImages = new ArrayList<>();
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile image : newImages) {
                try {
                    String originalFilename = image.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    String savedName = uuid + "_" + originalFilename;
                    String savePath = uploadPath + File.separator + savedName;

                    File dest = new File(savePath);
                    image.transferTo(dest);

                    ReviewImage reviewImage = ReviewImage.builder()
                            .review(review)
                            .fileName(originalFilename)
                            .uuid(uuid)
                            .build();
                    reviewImageRepository.save(reviewImage);

                    byte[] imageData = Files.readAllBytes(dest.toPath());
                    reviewDetailImages.add(imageData);
                } catch (IOException | java.io.IOException e) {
                    log.error("Failed to save new image file", e);
                    throw new RuntimeException("Failed to save new image file", e);
                }
            }
        }
        reviewDTO.setReviewDetailImages(reviewDetailImages);

        return reviewRepository.save(review);
    }

    // 리뷰 삭제
    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id : " + reviewId));

        // 리뷰와 관련된 이미지 삭제
        List<ReviewImage> images = reviewImageRepository.findByReview(review);
        for(ReviewImage image : images) {
            // 파일 시스템에서 이미지 삭제
            String filePath = uploadPath + File.separator + image.getUuid() + "_" + image.getFileName();
            try {
                Files.deleteIfExists(Paths.get(filePath));
            } catch (IOException | java.io.IOException e) {
                log.error("Failed to delete image file :" + filePath, e);
            }
            // DB에서 이미지 정보 삭제
            reviewImageRepository.delete(image);
        }

        // 리뷰 삭제
        reviewRepository.delete(review);
    }
}   