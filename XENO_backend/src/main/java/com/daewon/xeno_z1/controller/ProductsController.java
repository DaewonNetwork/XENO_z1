package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@RestController
@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductsController {


    private final ProductService productService;

//    @PreAuthorize("hasRole('USER')")



    @GetMapping("/read")
    public ResponseEntity<ProductInfoDTO> readProduct(@RequestParam Long productId) {
        ProductInfoDTO productInfoDTO = productService.getProductInfo(productId);
    log.info(productId);
        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping("/readImages")
    public ResponseEntity<List<byte[]>> readProductDetailImages(@RequestParam Long productId) {
        List<byte[]> productDetailImages = productService.getProductDetailImages(productId);
        log.info(productId);
        return ResponseEntity.ok(productDetailImages);
    }


}
