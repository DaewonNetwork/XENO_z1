package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.dto.ProductOrderBarDTO;
import com.daewon.xeno_z1.dto.ProductOtherColorImagesDTO;
import com.daewon.xeno_z1.dto.ProductRegisterDTO;
import com.daewon.xeno_z1.dto.ProductsInfoCardDTO;
import com.daewon.xeno_z1.dto.ProductsStarRankListDTO;
import com.daewon.xeno_z1.dto.review.ReviewCreateDTO;
import com.daewon.xeno_z1.service.ProductService;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    // @PreAuthorize("hasRole('USER')")

    @GetMapping("/read")
    public ResponseEntity<ProductInfoDTO> readProduct(@RequestParam Long productColorId) throws IOException {
        ProductInfoDTO productInfoDTO = productService.getProductInfo(productColorId);
        log.info(productColorId);
        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping("/readImages")
    public ResponseEntity<ProductDetailImagesDTO> readProductDetailImages(
            @RequestParam Long productColorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {

        try {
            // ProductService를 통해 페이징 처리된 상품의 상세 이미지 가져오기
            ProductDetailImagesDTO productDetailImagesDTO = productService.getProductDetailImages(productColorId, page,
                    size);

            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(productDetailImagesDTO);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @GetMapping("/rank/{category}")
//    public ResponseEntity<List<ProductsStarRankListDTO>> getTop10ProductsBySpecificCategory(
//            @PathVariable String category) {
//        List<ProductsStarRankListDTO> result = productService.getTop10ProductsBySpecificCategory(category);
//        return ResponseEntity.ok(result);
//    }
//
//    // 랭크 50까지
//    @GetMapping("/rank/page/{category}")
//    public ResponseEntity<Page<ProductsStarRankListDTO>> getProductsByCategoryWithPagination(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "20") int size,
//            @PathVariable String category) {
//        Page<ProductsStarRankListDTO> result = productService.getTop50ProductsByCategory(category, page, size);
//        return ResponseEntity.ok(result);
//    }

    @GetMapping("/readFirstImages")
    public ResponseEntity<List<ProductOtherColorImagesDTO>> readFirstProductImages(@RequestParam Long productColorId) {

        try {
            List<ProductOtherColorImagesDTO> firstProductImages = productService
                    .getRelatedColorProductsImages(productColorId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(firstProductImages);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "카테고리")
    @GetMapping("/read/category")
    public ResponseEntity<List<ProductsInfoCardDTO>> readProductsListByCategory(@RequestParam String categoryId,
            @RequestParam(required = false, defaultValue = "") String categorySubId) {

        try {
            List<ProductsInfoCardDTO> products = productService.getProductsInfoByCategory(categoryId, categorySubId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/readOrderBar")
    public ResponseEntity<ProductOrderBarDTO> readOrderBar(@RequestParam Long productColorId) {

        try {
            ProductOrderBarDTO orderBar = productService.getProductOrderBar(productColorId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(orderBar);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "좋아요한 상품")
    @GetMapping("/read/like")
    public ResponseEntity<List<ProductsInfoCardDTO>> readLikedProductList() {

        try {
            List<ProductsInfoCardDTO> products = productService.getLikedProductsInfo();
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "상품 카드")
    @GetMapping("/read/info")
    public ResponseEntity<ProductsInfoCardDTO> readProductCardInfo(@RequestParam Long productColorId) {

        try {
            ProductsInfoCardDTO product = productService.getProductCardInfo(productColorId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

     @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
     public ResponseEntity<?> registerProduct(
             @RequestPart("productRegisterDTO") String productRegisterDTOStr,
             @RequestPart("productImage") List<MultipartFile> productImage,
             @RequestPart("productDetailImage") MultipartFile productDetailImage) {

         ProductRegisterDTO productDTO;

         try {
             // JSON 문자열을 ReviewDTO 객체로 변환
             ObjectMapper objectMapper = new ObjectMapper();
             productDTO = objectMapper.readValue(productRegisterDTOStr, ProductRegisterDTO.class);
             log.info(productDTO);
         } catch (IOException e) {
             // JSON 변환 중 오류가 발생하면 로그를 남기고 예외 발생
             log.error(e.getMessage());
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
         }
         try {
             Products createdProduct = productService.createProduct(productDTO, productImage != null && !productImage.isEmpty() ? productImage : null,
                     productDetailImage != null && !productDetailImage.isEmpty() ? productDetailImage : null
                     );
             return ResponseEntity.ok("성공");
         } catch (Exception e) {
             log.error("상품 등록 중 오류 발생: ", e);
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
     }

}
