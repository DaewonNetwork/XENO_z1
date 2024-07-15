package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.dto.product.*;
import com.daewon.xeno_z1.service.ProductService;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Value;
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

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    // @PreAuthorize("hasRole('USER')")

        @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<?> createProduct(
                @RequestPart("productCreateDTO") String productRegisterDTOStr,
                @RequestPart(name = "productImages")  List<MultipartFile> productImages,
                @RequestPart(name = "productDetailImage") MultipartFile productDetailImage) {

            ProductRegisterDTO productDTO;
            log.info(productRegisterDTOStr);
            log.info(productDetailImage);
            log.info(productImages);

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
                Products createdProduct = productService.createProduct(productDTO, productImages != null && !productImages.isEmpty() ? productImages : null,
                        productDetailImage != null && !productDetailImage.isEmpty() ? productDetailImage : null
                );
                return ResponseEntity.ok("\"성공\"");
            } catch (Exception e) {
                log.error("상품 등록 중 오류 발생: ", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    @PostMapping(value = "/color/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProductColor(
            @RequestPart("productColorCreateDTO") String productColorCreateDTOStr,
            @RequestPart(name = "productImage",required = false)  List<MultipartFile> productImage,
            @RequestPart(name = "productDetailImage",required = false) MultipartFile productDetailImage) {

        ProductRegisterColorDTO productDTO;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            productDTO = objectMapper.readValue(productColorCreateDTOStr, ProductRegisterColorDTO.class);
            log.info(productDTO);
        } catch (IOException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body("유효하지 않은 JSON 형식입니다."); // 400 상태 코드
        }

        try {
            String resultMessage = productService.createProductColor(productDTO,
                    productImage != null && !productImage.isEmpty() ? productImage : null,
                    productDetailImage != null && !productDetailImage.isEmpty() ? productDetailImage : null
            );

            if ("상품이 존재하지 않습니다.".equals(resultMessage)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMessage); // 404 상태 코드
            }

            return ResponseEntity.ok(resultMessage); // 성공 시 200 상태 코드
        } catch (Exception e) {
            log.error("상품 등록 중 오류 발생: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 등록 중 오류가 발생했습니다."); // 500 상태 코드
        }
    }

    @GetMapping("/color/read")
    public ResponseEntity<ProductInfoDTO> readProductColor(@RequestParam Long productColorId) throws IOException {
        ProductInfoDTO productInfoDTO = productService.getProductColorInfo(productColorId);

        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping("/read")
    public ResponseEntity<ProductCreateGetInfoDTO> readProduct(@RequestParam Long productId) throws IOException {
        ProductCreateGetInfoDTO productInfoDTO = productService.getProductInfo(productId);

        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping("/color/readImages")
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

    @GetMapping("/color/readFirstImages")
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

    @GetMapping("/color/readOrderBar")
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
    @GetMapping("/color/read/info")
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


    @GetMapping("/seller/read")
    public ResponseEntity<?> getProductListBySeller(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String userEmail = userDetails.getUsername();

            log.info("orderUserEmail : " + userEmail);
            List<ProductListBySellerDTO> dtoList = productService.getProductListBySeller(userEmail);

            return ResponseEntity.ok(dtoList);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("해당하는 상품 또는 재고가 없습니다.");
        }
    }

}