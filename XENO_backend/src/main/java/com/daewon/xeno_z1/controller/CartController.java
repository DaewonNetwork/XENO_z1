//package com.daewon.xeno_z1.controller;
//
//import com.daewon.xeno_z1.dto.CartRequestDTO;
//import com.daewon.xeno_z1.service.CartService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@Log4j2
//@RequestMapping("/api/cart")
//@RequiredArgsConstructor
//public class CartController {
//
//    private final CartService cartService;
//
//    @PostMapping("/add/{productId}")
//    public ResponseEntity<String> addCart(@Valid @RequestBody CartRequestDTO request, @PathVariable Long productId) {
//
//        Long createdId = cartService.addCart(request, productId);
//
//        return ResponseEntity.ok("장바구니 등록 완료 " + createdId);
//    }
//}
