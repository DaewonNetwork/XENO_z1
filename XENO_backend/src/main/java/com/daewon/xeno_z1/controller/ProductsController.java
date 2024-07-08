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

import java.util.List;

@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductsController {


    private final ProductService productService;


//    @PreAuthorize("hasRole('USER')")


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
