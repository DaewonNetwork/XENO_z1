package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.dto.product.ProductCreateDTO;
import com.daewon.xeno_z1.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {


    private final ProductService productService;

    @Value("${org.daewon.upload.path}")
    private String uploadPath;


    // 상품등록
    /*
        Content-Type : multipart/form-data


     */
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("brandName") String brandName,
            @RequestParam("price") Long price,
            @RequestParam("isSale") boolean isSale,
            @RequestParam("priceSale") Long priceSale,
            @RequestParam("category") String category,
            @RequestParam("categorySub") String categorySub,
            @RequestParam("season") String season,
            @RequestParam("colors") List<String> colors,
            @RequestParam("size") List<String> size,
            @RequestParam("stock") List<Long> stock,
            @RequestParam("productImages") MultipartFile[] productImages,
            @RequestParam("productDetailImages") MultipartFile[] productDetailImages
    ) {

        try {
            if (productImages == null || productImages.length == 0) {
                throw new IllegalArgumentException("Product images are required");
            }
            if (productDetailImages == null || productDetailImages.length == 0) {
                throw new IllegalArgumentException("Product detail images are required");
            }

            List<List<MultipartFile>> productImagesListConverted = new ArrayList<>();
            List<List<MultipartFile>> productDetailImagesListConverted = new ArrayList<>();

            productImagesListConverted.add(Arrays.asList(productImages));
            productDetailImagesListConverted.add(Arrays.asList(productDetailImages));

            ProductCreateDTO productCreateDTO = ProductCreateDTO.builder()
                    .productName(productName)
                    .brandName(brandName)
                    .price(price)
                    .isSale(isSale)
                    .priceSale(priceSale)
                    .category(category)
                    .categorySub(categorySub)
                    .season(season)
                    .colors(colors)
                    .size(size)
                    .stock(stock)
                    .productImages(productImagesListConverted)
                    .productDetailImages(productDetailImagesListConverted)
                    .build();

            Products createdProduct = productService.createProduct(productCreateDTO, "uploadPath");
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }


//        try {
//            List<List<MultipartFile>> productImagesListConverted = new ArrayList<>();
//            List<List<MultipartFile>> productDetailImagesListConverted = new ArrayList<>();
//
//            if (productImages != null) {
//                for (MultipartFile[] mainImages : productImages) {
//                    productImagesListConverted.add(Arrays.asList(mainImages));
//                }
//            }
//
//            if (productDetailImages != null) {
//                for (MultipartFile[] detailImages : productDetailImages) {
//                    productDetailImagesListConverted.add(Arrays.asList(detailImages));
//                }
//            }
//
//            ProductCreateDTO productCreateDTO = ProductCreateDTO.builder()
//                    .productName(productName)
//                    .brandName(brandName)
//                    .price(price)
//                    .isSale(isSale)
//                    .priceSale(priceSale)
//                    .category(category)
//                    .categorySub(categorySub)
//                    .season(season)
//                    .colors(colors)
//                    .size(size)
//                    .stock(stock)
//                    .productImages(productImagesListConverted)
//                    .productDetailImages(productDetailImagesListConverted)
//                    .build();
//
//            Products createdProduct = productService.createProduct(productCreateDTO, "uploadPath");
//            return ResponseEntity.status(201).body(createdProduct);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("상품 등록 실패 : " + e.getMessage());
//        }

//        try {
//            ProductCreateDTO productCreateDTO = ProductCreateDTO.builder()
//                    .productName(productName)
//                    .brandName(brandName)
//                    .price(price)
//                    .isSale(isSale)
//                    .priceSale(priceSale)
//                    .category(category)
//                    .categorySub(categorySub)
//                    .season(season)
//                    .colors(colors)
//                    .size(size)
//                    .stock(stock)
//                    .productImages(productImages)
//                    .productDetailImages(productDetailImages)
//                    .build();
//
//            Products createdProduct = productService.createProduct(productCreateDTO, uploadPath);
//            return ResponseEntity.status(201).body(createdProduct);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("제품을 등록하는 도중 오류가 발생했습니다.");
//        }
    }

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






}
