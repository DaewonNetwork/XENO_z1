package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.dto.product.ProductRegisterDTO;
import com.daewon.xeno_z1.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {


    private final ProductService productService;

    @Value("${org.daewon.upload.path}")
    private String uploadPath;

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

    @GetMapping("/rank/{category}")
    public ResponseEntity<List<ProductsStarRankListDTO>> getranktop10(
            @PathVariable String category) {
        List<ProductsStarRankListDTO> result = productService.getranktop10(category);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/rank/page/{category}")
    public ResponseEntity<Page<ProductsStarRankListDTO>> getrankTop50(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @PathVariable String category) {
        Page<ProductsStarRankListDTO> result = productService.getrankTop50(category, page, size);
        return ResponseEntity.ok(result);
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
    public ResponseEntity<List<ProductsInfoByCategoryDTO>> readProductsListByCategory(@RequestParam String categoryId, @RequestParam(required = false, defaultValue = "") String categorySubId) {

        try {
            List<ProductsInfoByCategoryDTO> products = productService.getProductsInfoByCategory(categoryId,categorySubId);
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

    /*
        createProduct 값 넘겨주는 방식
        {
              "brandName": "Brand A",
              "category": "Clothing",
              "categorySub": "T-Shirts",
              "name": "Summer T-Shirt",
              "price": 50000,
              "sale": true,
              "priceSale": 45000,
              "productsNumber": "123456789",
              "season": "Summer",
              "colors": "Red",
              "size": [
                {"size": "S", "stock": 100},
                {"size": "M", "stock": 150},
                {"size": "L", "stock": 120}
              ]
        }
    */

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestPart("productCreateDTO") String productRegisterDTOStr,
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
