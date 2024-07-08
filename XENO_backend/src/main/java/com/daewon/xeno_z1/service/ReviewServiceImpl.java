//package com.daewon.xeno_z1.service;
//
//import com.daewon.xeno_z1.domain.Products;
//import com.daewon.xeno_z1.domain.ProductsImage;
//import com.daewon.xeno_z1.domain.Review;
//import com.daewon.xeno_z1.domain.ReviewImage;
//import com.daewon.xeno_z1.domain.Users;
//import com.daewon.xeno_z1.dto.ReviewDTO;
//import com.daewon.xeno_z1.repository.ProductsImageRepository;
//import com.daewon.xeno_z1.repository.ProductsRepository;
//import com.daewon.xeno_z1.repository.ReviewImageRepository;
//import com.daewon.xeno_z1.repository.ReviewRepository;
//import com.daewon.xeno_z1.repository.UserRepository;
//
//import io.jsonwebtoken.io.IOException;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//@Service
//@Log4j2
//@RequiredArgsConstructor
//public class ReviewServiceImpl implements ReviewService {
//
//    private final UserRepository usersRepository;
//    private final ReviewRepository reviewRepository;
//    private final ReviewImageRepository reviewImageRepository;
//    private final ProductsImageRepository productsImageRepository;
//    private final ProductsRepository productsRepository;
//
//    @Value("${uploadPath}")
//    private String uploadPath;
//
//    public byte[] getImage(String uuid, String fileName) throws IOException, java.io.IOException {
//        String filePath = uploadPath + uuid + "_" + fileName;
//        // 파일을 바이트 배열로 읽기
//        Path path = Paths.get(filePath);
//        byte[] image = Files.readAllBytes(path);
//        return image;
//    }
//
//    // 리뷰 이미지 총 갯수
//    @Override
//    public Long countReviewImagesByProductId(Long productId) {
//        return reviewImageRepository.countReviewImagesByProductId(productId);
//    }
//
//    // 제품의 전체 후기 사진
//    @Override
//    public List<ReviewImage> findAllReviewImagesByProductId(Long productId) {
//        return reviewImageRepository.findAllReviewImagesByProductId(productId);
//    }
//
//    // 리뷰 조회
//    @Override
//    public ReviewDTO getReviewDetails(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));
//        ReviewDTO dto = new ReviewDTO();
//        dto.setReviewId(review.getReviewId());
//        dto.setProductId(review.getProducts().getProductId());
//        dto.setUserId(review.getUsers().getUserId());
//        dto.setText(review.getText());
//        dto.setStar((int) review.getStar());
//        dto.setReviewDate(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
//        dto.setNickname(review.getUsers().getName());
//        dto.setProductImage(productsImageRepository.findByProductColorId(review.getProducts().getProductId())
//                .stream().findFirst().map(ProductsImage::getFileName).orElse(null));
//        dto.setSize(review.getSize().toString());
//
//        List<ReviewImage> reviewImages = reviewImageRepository.findByReview(review);
//        List<byte[]> reviewDetailImages = new ArrayList<>();
//        for (ReviewImage reviewImage : reviewImages) {
//            try {
//                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
//                reviewDetailImages.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading review image file", e);
//            }
//        }
//        dto.setReviewDetailImages(reviewDetailImages);
//
//        // 제품 이미지 설정
//        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
//        List<byte[]> productImageBytes = new ArrayList<>();
//        for (ProductsImage productImage : productImages) {
//            try {
//                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
//                productImageBytes.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading product image file", e);
//            }
//        }
//        dto.setProductImages(productImageBytes);
//
//        return dto;
//    }
//
//
//    // 리뷰 생성
//    @Override
//    public Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images) {
//        Products product = productsRepository.findById(reviewDTO.getProductId())
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//
//        Review review = Review.builder()
//                .text(reviewDTO.getText())
//                .star(reviewDTO.getStar())
//                .products(product)
//                .users(Users.builder().userId(reviewDTO.getUserId()).build())
//                .size(Long.parseLong(reviewDTO.getSize()))
//                .build();
//
//        review = reviewRepository.save(review);
//
//        List<byte[]> reviewDetailImages = new ArrayList<>();
//        if (images != null && !images.isEmpty()) {
//            for (MultipartFile image : images) {
//                try {
//                    String originalFilename = image.getOriginalFilename();
//                    String uuid = UUID.randomUUID().toString();
//                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
//                    String savedName = uuid + "_" + originalFilename;  // UUID와 원본 파일 이름 사이에 '_' 추가
//                    String savePath = uploadPath + File.separator + savedName;
//
//                    File dest = new File(savePath);
//                    image.transferTo(dest);
//
//                    ReviewImage reviewImage = ReviewImage.builder()
//                            .review(review)
//                            .fileName(originalFilename)  // 원본 파일 이름 저장
//                            .uuid(uuid)
//                            .build();
//                    reviewImageRepository.save(reviewImage);
//
//                    byte[] imageData = Files.readAllBytes(dest.toPath());
//                    reviewDetailImages.add(imageData);
//                } catch (IOException | java.io.IOException e) {
//                    throw new RuntimeException("Failed to save image file", e);
//                }
//            }
//        }
//        reviewDTO.setReviewDetailImages(reviewDetailImages);
//
//        // 제품 이미지 처리
//        List<ProductsImage> productImages = productsImageRepository.findByProductId(product.getProductId());
//        List<byte[]> productImageBytes = new ArrayList<>();
//        for (ProductsImage productImage : productImages) {
//            try {
//                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
//                productImageBytes.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading product image file", e);
//            }
//        }
//        reviewDTO.setProductImages(productImageBytes);
//
//        return review;
//    }
//
//    @Override
//    public Page<ReviewDTO> getReviews(int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return reviewRepository.findAll(pageable).map(this::convertToDTO);
//    }
//
//    private ReviewDTO convertToDTO(Review review) {
//        ReviewDTO dto = new ReviewDTO();
//        dto.setReviewId(review.getReviewId());
//        dto.setProductId(review.getProducts().getProductId());
//        dto.setUserId(review.getUsers().getUserId());
//        dto.setText(review.getText());
//        dto.setStar((int) review.getStar());
//        dto.setReviewDate(review.getCreateAt().toString());
//        dto.setNickname(usersRepository.findById(review.getUsers().getUserId()).get().getName());
//        dto.setProductImage(productsImageRepository.findByProductColorId(review.getProducts().getProductId()).get(0).getFileName());
//        dto.setSize(review.getSize().toString());
//
//        // 리뷰 이미지 설정
//        List<ReviewImage> reviewImages = reviewImageRepository.findByReview(review);
//        List<byte[]> reviewDetailImages = new ArrayList<>();
//        for (ReviewImage reviewImage : reviewImages) {
//            try {
//                byte[] imageData = getImage(reviewImage.getUuid(), reviewImage.getFileName());
//                reviewDetailImages.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading review image file", e);
//            }
//        }
//        dto.setReviewDetailImages(reviewDetailImages);
//
//        // 제품 이미지 설정
//        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
//        List<byte[]> productImageBytes = new ArrayList<>();
//        for (ProductsImage productImage : productImages) {
//            try {
//                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
//                productImageBytes.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading product image file", e);
//            }
//        }
//        dto.setProductImages(productImageBytes);
//
//        return dto;
//    }
//
//    // 리뷰 수정
//    @Override
//    public Review updateReview(Long reviewId, ReviewDTO reviewDTO, List<MultipartFile> newImages) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));
//
//        review.setText(reviewDTO.getText());
//        review.setStar(reviewDTO.getStar());
//        review.setSize(Long.parseLong(reviewDTO.getSize()));
//
//        List<ReviewImage> oldImages = reviewImageRepository.findByReview(review);
//        for (ReviewImage oldImage : oldImages) {
//            String filePath = uploadPath + File.separator + oldImage.getUuid() + "_" + oldImage.getFileName();
//            try {
//                Files.deleteIfExists(Paths.get(filePath));
//            } catch (IOException | java.io.IOException e) {
//                log.error("Failed to delete old image file: " + filePath, e);
//            }
//            reviewImageRepository.delete(oldImage);
//        }
//
//        List<byte[]> reviewDetailImages = new ArrayList<>();
//        if (newImages != null && !newImages.isEmpty()) {
//            for (MultipartFile image : newImages) {
//                try {
//                    String originalFilename = image.getOriginalFilename();
//                    String uuid = UUID.randomUUID().toString();
//                    String savedName = uuid + "_" + originalFilename;
//                    String savePath = uploadPath + File.separator + savedName;
//
//                    File dest = new File(savePath);
//                    image.transferTo(dest);
//
//                    ReviewImage reviewImage = ReviewImage.builder()
//                            .review(review)
//                            .fileName(originalFilename)
//                            .uuid(uuid)
//                            .build();
//                    reviewImageRepository.save(reviewImage);
//
//                    byte[] imageData = Files.readAllBytes(dest.toPath());
//                    reviewDetailImages.add(imageData);
//                } catch (IOException | java.io.IOException e) {
//                    log.error("Failed to save new image file", e);
//                    throw new RuntimeException("Failed to save new image file", e);
//                }
//            }
//        }
//        reviewDTO.setReviewDetailImages(reviewDetailImages);
//
//        // 제품 이미지 처리
//        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
//        List<byte[]> productImageBytes = new ArrayList<>();
//        for (ProductsImage productImage : productImages) {
//            try {
//                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
//                productImageBytes.add(imageData);
//            } catch (IOException | java.io.IOException e) {
//                log.error("Error reading product image file", e);
//            }
//        }
//        reviewDTO.setProductImages(productImageBytes);
//
//        return reviewRepository.save(review);
//    }
//
//    // 리뷰 삭제
//    @Override
//    public void deleteReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new RuntimeException("Review not found with id : " + reviewId));
//
//        // 리뷰와 관련된 이미지 삭제
//        List<ReviewImage> images = reviewImageRepository.findByReview(review);
//        for(ReviewImage image : images) {
//            // 파일 시스템에서 이미지 삭제
//            String filePath = uploadPath + File.separator + image.getUuid() + "_" + image.getFileName();
//            try {
//                Files.deleteIfExists(Paths.get(filePath));
//            } catch (IOException | java.io.IOException e) {
//                log.error("Failed to delete image file :" + filePath, e);
//            }
//            // DB에서 이미지 정보 삭제
//            reviewImageRepository.delete(image);
//        }
//
//        // 리뷰 삭제
//        reviewRepository.delete(review);
//    }
//}