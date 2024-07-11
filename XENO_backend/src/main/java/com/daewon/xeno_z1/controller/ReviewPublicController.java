package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.page.PageRequestDTO;
import com.daewon.xeno_z1.dto.page.PageResponseDTO;
import com.daewon.xeno_z1.dto.review.ReviewCardDTO;
import com.daewon.xeno_z1.dto.review.ReviewInfoDTO;
import com.daewon.xeno_z1.repository.ProductsImageRepository;
import com.daewon.xeno_z1.repository.ReviewImageRepository;
import com.daewon.xeno_z1.repository.ReviewRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import com.daewon.xeno_z1.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewPublicController {

    private final ReviewService reviewService;
    private final ReviewImageRepository reviewImageRepository;
    private final UserRepository userRepository;
    private final ProductsImageRepository productsImageRepository;
    private final ReviewRepository reviewRepository;

    @Value("${uploadPath}")
    private String uploadPath;


//    @Operation(summary = "리뷰 생성")
//    public ResponseEntity<?> createReview(
//            @RequestPart(name = "reviewDTO") String reviewDTOStr,
//            @RequestPart(name = "images", required = false) List<MultipartFile> image) {
//        log.info("Received reviewDTO: {}", reviewDTOStr);
//        log.info("Images: " + images);
//
//        ReviewDTO reviewDTO;
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//            String decodedReviewDTO = URLDecoder.decode(reviewDTOStr, StandardCharsets.UTF_8.name());
//            reviewDTO = objectMapper.readValue(decodedReviewDTO, ReviewDTO.class);
//            log.info("Parsed ReviewDTO: {}", reviewDTO);
//        } catch (IOException e) {
//            log.error("Error parsing reviewDTO", e);
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
//        }
//
//        try {
//            Review createdReview = reviewService. createReview(reviewDTO, image);
//            ReviewDTO responseDTO = convertToDTO(createdReview);
//            return ResponseEntity.ok(responseDTO);
//        } catch (RuntimeException e) {
//            log.error("Error creating review", e);
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request", e);
//        }
//    }



//
//    @PutMapping(value = "/{reviewId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "리뷰 수정")
//    public ResponseEntity<?> updateReview(
//                @PathVariable Long reviewId,
//                @RequestPart(name = "reviewDTO") String reviewDTOStr,
//                @RequestPart(name = "images", required = false) List<MultipartFile> images) {
//            ReviewDTO reviewDTO;
//            try {
//                ObjectMapper objectMapper = new ObjectMapper();
//                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//                String decodedReviewDTO = URLDecoder.decode(reviewDTOStr, StandardCharsets.UTF_8.name());
//                reviewDTO = objectMapper.readValue(decodedReviewDTO, ReviewDTO.class);
//            } catch (IOException e) {
//                log.error("Error parsing reviewDTO", e);
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
//            }
//
//            try {
//                Review updatedReview = reviewService.updateReview(reviewId, reviewDTO, images);
//                ReviewDTO responseDTO = convertToDTO(updatedReview);
//                return ResponseEntity.ok(responseDTO);
//            } catch (Exception e) {
//                log.error("Error updating review", e);
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating review", e);
//            }
//    }
//

//
//    // 리뷰 삭제
//    @DeleteMapping("/{reviewId}")
//    @Operation(summary = "리뷰 삭제")
//    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
//        try {
//            reviewService.deleteReview(reviewId);
//            return ResponseEntity.ok().body("리뷰 삭제 완료");
//        }  catch (RuntimeException e) {
//            log.error("리뷰 삭제 중 오류 발생", e);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        }
//    }




    @Operation(summary = "리뷰 조회")
    @GetMapping("/read")
    public ResponseEntity<ReviewInfoDTO> getReviewInfo(@RequestParam Long reviewId) {
        try {
            ReviewInfoDTO reviewInfoDTO = reviewService.readReviewInfo(reviewId);
            return ResponseEntity.ok(reviewInfoDTO);
        } catch (RuntimeException e) {
            log.error("Error fetching review details for reviewId {}: ", reviewId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @Operation(summary = "리뷰 리스트")
    @GetMapping("/read/List")
    public ResponseEntity<PageResponseDTO<ReviewInfoDTO>> getReviews(@RequestParam Long productColorId, PageRequestDTO pageRequestDTO) {
        PageResponseDTO<ReviewInfoDTO> reviews = reviewService.readReviewList(productColorId,pageRequestDTO);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/page/card")
    @Operation(summary = "제품의 모든 리뷰 이미지 가져오기")
    public ResponseEntity<PageResponseDTO<ReviewCardDTO>> getReviewCardList(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<ReviewCardDTO> reviewList = reviewService.readAllReviewImageList(pageRequestDTO);
        return ResponseEntity.ok(reviewList);
    }
}

