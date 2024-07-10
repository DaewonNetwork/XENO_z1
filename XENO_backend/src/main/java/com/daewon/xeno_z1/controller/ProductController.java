package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.dto.ProductregisterDTO;

import com.daewon.xeno_z1.dto.ProductsStarRankListDTO;
import com.daewon.xeno_z1.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
//@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/product")
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

    @GetMapping("/top10-by-category")
    public ResponseEntity<Map<String, List<ProductsStarRankListDTO>>> getTop10ProductsByCategoryRank() {
        Map<String, List<ProductsStarRankListDTO>> result = productService.getTop10ProductsByCategoryRank();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/top10-by-category/{category}")
    public ResponseEntity<List<ProductsStarRankListDTO>> getTop10ProductsBySpecificCategory(@PathVariable String category) {
        List<ProductsStarRankListDTO> result = productService.getTop10ProductsBySpecificCategory(category);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/rank/page/{category}")
    public ResponseEntity<List<ProductsStarRankListDTO>> getTop50ProductsByCategory(@PathVariable String category) {
        List<ProductsStarRankListDTO> result = productService.getTop50ProductsByCategory(category);
        return ResponseEntity.ok(result);
    }

    // @GetMapping("/rank/page/{category}")
    // public ResponseEntity<Page<ProductsStarRankListDTO>> getProductsByCategoryWithPagination(
    //         @RequestParam(defaultValue = "0") int page,
    //         @RequestParam(defaultValue = "20") int size,
    //         @PathVariable String category) {
    //     Page<ProductsStarRankListDTO> result = productService.getTop50ProductsByCategory(category, page, size);
    //     return ResponseEntity.ok(result);
    // }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> registerProduct(
            @RequestPart("productData") String productDataString,
            @RequestPart("productImage") List<MultipartFile> productImage,
            @RequestPart("productDetailImages") List<MultipartFile> productDetailImages) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductregisterDTO productRegisterDTO = objectMapper.readValue(productDataString, ProductregisterDTO.class);
            productService.registerProduct(productRegisterDTO, productImage, productDetailImages);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("상품 등록 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}
