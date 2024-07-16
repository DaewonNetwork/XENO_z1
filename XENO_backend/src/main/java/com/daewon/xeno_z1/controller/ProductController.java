package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.dto.product.*;
import com.daewon.xeno_z1.service.ProductService;

import com.daewon.xeno_z1.utils.ProductSecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    private final ProductSecurityUtils productSecurityUtils;

    @PreAuthorize("hasRole('SELLER')")
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

<<<<<<< HEAD
    @PreAuthorize("@productSecurityUtils.isProductOwner(#productUpdateDTO.productId)")
=======
>>>>>>> Product_Detail_Page2
    @PutMapping("/update")
    @Operation(summary = "상품 수정")
    public ResponseEntity<?> updateProduct(
            @RequestBody ProductUpdateDTO productUpdateDTO) {
<<<<<<< HEAD
        log.info(productUpdateDTO);
=======
            log.info(productUpdateDTO);
>>>>>>> Product_Detail_Page2
        try {

            String result = productService.updateProduct(productUpdateDTO);
            return ResponseEntity.ok("\"수정 성공\"");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("상품 업데이트 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

<<<<<<< HEAD
    @PreAuthorize("@productSecurityUtils.isProductOwner(#productId)")
=======
>>>>>>> Product_Detail_Page2
    @DeleteMapping("/delete")
    @Operation(summary = "상품 삭제")
    public ResponseEntity<?> deleteProduct(@RequestParam Long productId) {
        try {
            productService.deleteProduct(productId);
<<<<<<< HEAD
            return ResponseEntity.ok().body("상품 삭제 완료");
=======
            return ResponseEntity.ok("\"삭제 성공\"");
        }  catch (RuntimeException e) {
            log.error("상품 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/color/delete")
    @Operation(summary = "상품 삭제")
    public ResponseEntity<?> deleteProductColor(@RequestParam Long productColorId) {
        try {
            productService.deleteProductColor(productColorId);
            return ResponseEntity.ok("\"삭제 성공\"");
>>>>>>> Product_Detail_Page2
        }  catch (RuntimeException e) {
            log.error("상품 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }




<<<<<<< HEAD
//    @PreAuthorize("@productSecurityUtils.isProductOwner(#productDTO.productId)")
=======
>>>>>>> Product_Detail_Page2
    @PostMapping(value = "/color/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProductColor(
            @RequestPart("productColorCreateDTO") String productColorCreateDTOStr,
            @RequestPart(name = "productImages")  List<MultipartFile> productImages,
            @RequestPart(name = "productDetailImage") MultipartFile productDetailImage) {

        ProductRegisterColorDTO productDTO;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            productDTO = objectMapper.readValue(productColorCreateDTOStr, ProductRegisterColorDTO.class);
            log.info(productDTO);

//            // 여기서 @PreAuthorize를 위한 검사를 수행합니다.
//            if (!productSecurityUtils.isProductOwner(productDTO.getProductId())) {
//                return ResponseEntity.status(403).body("접근 권한이 없습니다.");
//            }

        } catch (IOException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body("유효하지 않은 JSON 형식입니다."); // 400 상태 코드
        }

        try {
            String resultMessage = productService.createProductColor(productDTO,
                    productImages != null && !productImages.isEmpty() ? productImages : null,
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

<<<<<<< HEAD
//    @PreAuthorize("@productSecurityUtils.isProductOwner(#productDTO.productId)")
    @PutMapping("/color/update")
    @Operation(summary = "상품 컬러 수정")
    public ResponseEntity<?> updateProductColor(@RequestPart("productColorUpdateDTO") String productColorUpdateDTOStr,
                                                @RequestPart(name = "productImages",required = false)  List<MultipartFile> productImages,
                                                @RequestPart(name = "productDetailImage",required = false) MultipartFile productDetailImage) {
=======
    @PutMapping("/color/update")
    @Operation(summary = "상품 컬러 수정")
    public ResponseEntity<?> updateProductColor(@RequestPart("productColorUpdateDTO") String productColorUpdateDTOStr,
                                                @RequestPart(name = "productImages")  List<MultipartFile> productImages,
                                                @RequestPart(name = "productDetailImage") MultipartFile productDetailImage) {
>>>>>>> Product_Detail_Page2
        ProductUpdateColorDTO productDTO;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            productDTO = objectMapper.readValue(productColorUpdateDTOStr, ProductUpdateColorDTO.class);
            log.info(productDTO);
        } catch (IOException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body("유효하지 않은 JSON 형식입니다."); // 400 상태 코드
        }

        try {
            String resultMessage = productService.updateProductColor(productDTO,
                    productImages != null && !productImages.isEmpty() ? productImages : null,
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

    @GetMapping("/color/size/read")
    public ResponseEntity<ProductColorUpdateGetInfoDTO> readProductColorSize(@RequestParam Long productColorId) throws IOException {
        ProductColorUpdateGetInfoDTO productInfoDTO = productService.getProductColorSizeInfo(productColorId);

        return ResponseEntity.ok(productInfoDTO);
    }
    @GetMapping("/color/image/read")
    public ResponseEntity<byte[]> readImage(@RequestParam Long productColorId) throws IOException {
        // 실제 파일 데이터를 읽어옴 (파일 경로는 적절하게 설정해야 함)
        byte[] fileContent = productService.readImage(productColorId);

        log.info(fileContent);
        // HTTP 응답으로 파일 데이터 전송
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION)
                .body(fileContent);
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

    @GetMapping("/color/seller/read")
    public ResponseEntity<?> getProductColorListBySeller(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String userEmail = userDetails.getUsername();

            log.info("orderUserEmail : " + userEmail);
            List<ProductColorListBySellerDTO> dtoList = productService.getProductColorListBySeller(userEmail);

            return ResponseEntity.ok(dtoList);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("해당하는 상품 또는 재고가 없습니다.");
        }
    }

<<<<<<< HEAD
}

/*

    productCreateDTO 해당 형식으로 값 넘기면 됨.
   {
        "category": "Clothing",
        "categorySub": "Shirts",
        "name": "Summer T-Shirt",
        "price": 29999,
        "sale": true,
        "priceSale": 24999,
        "productNumber": "TS001",
        "season": "Summer",
        "colors": "Red,Blue,Green",
        "size": [
                    {
                        "size": "S",
                        "stock" : 100
                    },
                    {
                        "size": "M",
                        "stock" : 150
                    },
                    {
                        "size": "L",
                        "stock": 100
                    }
                 ]
    }

createProductColor 값 넘겨주는법

productColorCreateDTO :

{
  "productId": 해당하는 productId 값,
  "color": "Red",
  "size": [
    {
      "size": "S",
      "stock": 50
    },
    {
      "size": "M",
      "stock": 75
    },
    {
      "size": "L",
      "stock": 100
    }
  ]
}

updateProduct 값 넘기는법
수정해야 하는 productId값 넘겨주고

productUpdateDTO는 해당하는 형식으로 넘겨주면 됨.
{
  "name": "Updated Product Name",
  "price": 15000,
  "isSale": true,
  "priceSale": 12000,
  "category": "Electronics",
  "categorySub": "Smartphones",
  "season": "Summer",
  "size": ["S", "M", "L"],
  "stock": [10, 20, 30]
}

updateProductColor 값 넘기는법

productUpdateColorDTO =

{
  "productId": 해당하는 productId,
  "color": "productId에 해당하는 color명",
  "size": [
    {
      "size": "S",
      "stock": 1000
    },
    {
      "size": "M",
      "stock": 2000
    },
    {
      "size": "L",
      "stock": 3000
    }
  ]
}


 */
=======
}
>>>>>>> Product_Detail_Page2
