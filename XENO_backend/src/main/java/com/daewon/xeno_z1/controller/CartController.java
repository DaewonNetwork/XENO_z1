package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;
import com.daewon.xeno_z1.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<String> addToCart(@RequestBody CartDTO cartDTO) {
        cartService.addToCart(cartDTO.getUserId(), cartDTO.getProductsColorSizeId(),
                              cartDTO.getProductsImageId(), cartDTO.getQuantity());

        return ResponseEntity.ok("상품 등록이 완료되었습니다.");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<String> updateCartItem(@PathVariable Long cartId, @RequestBody CartDTO cartDTO) {
        cartService.updateCartItem(cartId, cartDTO.getQuantity(), cartDTO.isSelected());
        return ResponseEntity.ok("장바구니 수량 및 선택 여부가 수정 되었습니다.");
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok("장바구니가 정상적으로 삭제 되었습니다.");
    }

    @GetMapping("/summary/{userId}")
    public ResponseEntity<CartSummaryDTO> getCartSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartSummary(userId));
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
    http://localhost:8090/api/cart/1 (1은 cartId)

    4. removeFromCart (DELETE)
    http://localhost:8090/api/cart/1 (1은 cartId)

    5. getCartSummary (GET)
    http://localhost:8090/api/cart/summary/1 (1은 userId)
 */
