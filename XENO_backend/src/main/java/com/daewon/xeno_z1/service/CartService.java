package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.dto.cart.AddToCartDTO;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;

import java.util.List;
import java.util.Map;

public interface CartService {

//    Long addCart(CartDTO request);
//    void addToCart(Long userId, Long productColorSizeId, Long productImageId, Long quantity);

    void addToCart(List<AddToCartDTO> addToCartDTOList);

    List<CartDTO> getCartItems(Long userId);

    void updateCartItem(Long userId, Long cartId, Long quantity);

    boolean removeFromCart(Long cartId);

    CartSummaryDTO getCartSummary(Long userId);

    CartDTO convertToDTO(Cart cart);
}
