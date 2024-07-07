package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.domain.ProductsImage;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.ReviewImage;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.ReviewDTO;
import com.daewon.xeno_z1.repository.ProductsColorRepository;
import com.daewon.xeno_z1.repository.ProductsColorSizeRepository;
import com.daewon.xeno_z1.repository.ProductsImageRepository;
import com.daewon.xeno_z1.repository.ProductsRepository;
import com.daewon.xeno_z1.repository.ReviewImageRepository;
import com.daewon.xeno_z1.repository.ReviewRepository;
import com.daewon.xeno_z1.repository.UserRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    private final ProductsRepository productsRepository;
    private final ProductsColorRepository productsColorRepository;
    private final ProductsColorSizeRepository productsColorSizeRepository;

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
    public List<byte[]> getAllReviewImages() {
        List<ReviewImage> reviewImages = reviewImageRepository.findAll();
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
        dto.setStar(review.getStar());
        dto.setReviewDate(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
        dto.setName(review.getUsers().getName());
        dto.setProductColorId(review.getProductsColor().getProductColorId());
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
        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
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
        Products product = productsRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
    
        ProductsColor productsColor = productsColorRepository.findById(reviewDTO.getProductColorId())
                .orElseThrow(() -> new RuntimeException("ProductColor not found"));
        
        ProductsColorSize productsColorSize = productsColorSizeRepository.findByProductsColor(productsColor)
                .orElseThrow(() -> new RuntimeException("ProductColorSize not found for the given color"));
            
        // size에 따라 적절한 재고를 확인
        long stock = switch (reviewDTO.getSize().toUpperCase()) {
            case "S" -> productsColorSize.getStock_s();
            case "M" -> productsColorSize.getStock_m();
            case "L" -> productsColorSize.getStock_l();
            case "XL" -> productsColorSize.getStock_xl();
            default -> throw new RuntimeException("Invalid size");
        };
            
        if (stock <= 0) {
            throw new RuntimeException("Out of stock for the selected size");
        }
    
        Review review = Review.builder()
                .text(reviewDTO.getText())
                .star(reviewDTO.getStar())
                .size(reviewDTO.getSize())
                .products(product)
                .productsColor(productsColor)
                .productsColorSize(productsColorSize)
                .users(Users.builder().userId(reviewDTO.getUserId()).build())
                .build();
    
        review = reviewRepository.save(review);
    

        List<byte[]> reviewDetailImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    String originalFilename = image.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String savedName = uuid + "_" + originalFilename;  // UUID와 원본 파일 이름 사이에 '_' 추가
                    String savePath = uploadPath + File.separator + savedName;

                    File dest = new File(savePath);
                    image.transferTo(dest);

                    ReviewImage reviewImage = ReviewImage.builder()
                            .review(review)
                            .fileName(originalFilename)  // 원본 파일 이름 저장
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
        reviewDTO.setReviewDetailImages(reviewDetailImages);

        // 제품 이미지 처리
        List<ProductsImage> productImages = productsImageRepository.findByProductId(product.getProductId());
        List<byte[]> productImageBytes = new ArrayList<>();
        for (ProductsImage productImage : productImages) {
            try {
                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
                productImageBytes.add(imageData);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading product image file", e);
            }
        }
        reviewDTO.setProductImages(productImageBytes);

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
        dto.setStar(review.getStar());
        dto.setReviewDate(review.getCreateAt().toString());
        dto.setName(usersRepository.findById(review.getUsers().getUserId()).get().getName());
        dto.setSize(review.getSize());
    
        // ProductsColor 관련 필드 설정
        dto.setProductColorId(review.getProductsColor().getProductColorId());
    
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
        // 제품 이미지 설정
        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
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

        // 제품 이미지 처리
        List<ProductsImage> productImages = productsImageRepository.findByProductId(review.getProducts().getProductId());
        List<byte[]> productImageBytes = new ArrayList<>();
        for (ProductsImage productImage : productImages) {
            try {
                byte[] imageData = getImage(productImage.getUuid(), productImage.getFileName());
                productImageBytes.add(imageData);
            } catch (IOException | java.io.IOException e) {
                log.error("Error reading product image file", e);
            }
        }
        reviewDTO.setProductImages(productImageBytes);

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