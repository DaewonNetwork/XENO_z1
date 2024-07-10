package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

//@RestController
@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {


    private final ProductService productService;

//    @PreAuthorize("hasRole('USER')")



    @GetMapping("/read")
    public ResponseEntity<ProductInfoDTO> readProduct(@RequestParam Long productId) throws IOException {
        ProductInfoDTO productInfoDTO = productService.getProductInfo(productId);
    log.info(productId);
        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping("/readImages")
    public ResponseEntity<ProductDetailImagesDTO> readProductDetailImages(
            @RequestParam Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {
        
        try {
            // ProductService를 통해 페이징 처리된 상품의 상세 이미지 가져오기
            ProductDetailImagesDTO productDetailImagesDTO = productService.getProductDetailImages(productId, page,size);
            
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(productDetailImagesDTO);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/readFirstImages")
    public ResponseEntity<List<ProductOtherColorImagesDTO>> readFirstProductImages(@RequestParam Long productColorId) {

        try {
            List<ProductOtherColorImagesDTO> firstProductImages = productService.getRelatedColorProductsImages(productColorId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(firstProductImages);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "카테고리")
    @GetMapping("/read/category")
    public ResponseEntity<List<ProductsInfoCardDTO>> readProductsListByCategory(@RequestParam String categoryId, @RequestParam(required = false, defaultValue = "") String categorySubId) {

        try {
            List<ProductsInfoCardDTO> products = productService.getProductsInfoByCategory(categoryId,categorySubId);
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

}
