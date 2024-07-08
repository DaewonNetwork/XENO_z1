package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.cart.AddToCartDTO;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;
import com.daewon.xeno_z1.service.CartService;
import com.daewon.xeno_z1.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JWTUtil jwtUtil;

    @Value("${org.daewon.upload.path}")
    private String uploadPath;

    @PostMapping(produces = "application/json")
    public ResponseEntity<String> addToCart(@RequestBody List<AddToCartDTO> addToCartDTO) {
        try {
            // addToCartDTO를 이용한 비즈니스 로직 처리 (예: productService.addToCart(addToCartDTO);)
            cartService.addToCart(addToCartDTO);
            // 성공적으로 처리된 경우
            return ResponseEntity.ok("\"Successfully added to cart\"");

        } catch (Exception e) {
            // 오류 발생 시
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("\"Failed to add to cart\"");
        }
    }

    @GetMapping
    public ResponseEntity<?> getCartItems(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            Map<String, Object> claims = jwtUtil.validateToken(token);
            Long userId = Long.parseLong(claims.get("userId").toString());

            log.info("유저 ID: " + userId);

            List<CartDTO> cartList = cartService.getCartItems(userId);

            log.info("장바구니 목록: " + cartList);

            return ResponseEntity.ok(cartList);
        } catch (JwtException e) {
            return ResponseEntity.status(401).body("토큰이 유효하지 않습니다.");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCartItem(@RequestParam Long cartId, @RequestBody CartDTO cartDTO) {
        cartService.updateCartItem(cartId, cartDTO.getQuantity());
        return ResponseEntity.ok("장바구니 수량 및 선택 여부가 수정 되었습니다.");
    }

//    @DeleteMapping
//    public ResponseEntity<String> removeFromCart(@RequestParam Long cartId) {
//        boolean removed = cartService.removeFromCart(cartId);
//        if (removed) {
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body("장바구니 물건을 찾을 수 없습니다 with id: " + cartId);
//        }
//    }

    @DeleteMapping
    public ResponseEntity<Map<String, String>> removeFromCart(@RequestParam Long cartId) {
        boolean removed = cartService.removeFromCart(cartId);
        if (removed) {
            return ResponseEntity.ok().build();
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Cart item not found with id: " + cartId);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(errorResponse);
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getCartSummary(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            Map<String, Object> claims = jwtUtil.validateToken(token);
            Long userId = Long.parseLong(claims.get("userId").toString());

            log.info("유저 ID: " + userId);

            CartSummaryDTO cartSummary = cartService.getCartSummary(userId);

            log.info("장바구니 목록: " + cartSummary);

            return ResponseEntity.ok(cartSummary);
        } catch (JwtException e) {
            return ResponseEntity.status(401).body("토큰이 유효하지 않습니다.");
        }
    }

    public byte[] getImage(String uuid, String fileName) throws IOException {
        String filePath = uploadPath + uuid + "_" + fileName;
        // 파일을 바이트 배열로 읽기
        Path path = Paths.get(filePath);
        byte[] image = Files.readAllBytes(path);
        return image;
    }
}

/*
    1. addToCart (POST)
    http://localhost:8090/api/cart
    {
        "userId": 1,
        "productColorSizeId": 1,
        "productImageId": 1,
        "quantity": 2
    }

    2. getCartItems (GET)
    http://localhost:8090/api/cart/1 (1은 userId)

    3. updateCartItem (PUT)
    http://localhost:8090/api
    {
      "cartId": 4,
      "quantity": 8,
      "price": 3,
      "selected": true
    }

    4. removeFromCart (DELETE)
    http://localhost:8090/api

    formdata로
    cartId  : DB에 저장되어 있는 cartId

    5. getCartSummary (GET)
    http://localhost:8090/api/cart/summary/1 (1은 userId)
 */
