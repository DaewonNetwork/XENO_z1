package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.repository.ProductsColorSizeRepository;
import com.daewon.xeno_z1.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductsPublicController {


    private final ProductService productService;
    private final ProductsColorSizeRepository productsColorSizeRepository;
    private final ConversionService conversionService;

//    @PreAuthorize("hasRole('USER')")



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
            ProductDetailImagesDTO productDetailImagesDTO = productService.getProductDetailImages(productColorId, page,size);

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
    public ResponseEntity<List<ProductsInfoByCategoryDTO>> readProductsListByCategory(@RequestParam String categoryId) {

        try {
            List<ProductsInfoByCategoryDTO> products = productService.getProductsInfoByCategory(categoryId);
            // 페이징된 이미지 데이터와 HTTP 200 OK 응답 반환
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "카테고리 서브")
    @GetMapping("/read/categorySub")
    public ResponseEntity<List<ProductsInfoByCategoryDTO>> readProductsListByCategorySub(@RequestParam String categorySubId) {

        try {
            List<ProductsInfoByCategoryDTO> products = productService.getProductsInfoByCategorySub(categorySubId);
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

    @Operation(summary = "카트 추가")
    @PostMapping(value = "/addToCart", produces = "application/json")
    public ResponseEntity<String> addToCart(@RequestBody List<AddToCartDTO> addToCartDTO) {
        try {
            // addToCartDTO를 이용한 비즈니스 로직 처리 (예: productService.addToCart(addToCartDTO);)
            productService.addToCart(addToCartDTO);
            // 성공적으로 처리된 경우
            return ResponseEntity.ok("\"Successfully added to cart\"");

        } catch (Exception e) {
            // 오류 발생 시
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("\"Failed to add to cart\"");
        }
    }






}
