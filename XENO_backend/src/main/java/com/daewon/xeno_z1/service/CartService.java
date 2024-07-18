package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.dto.cart.AddToCartDTO;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;

import java.util.List;

public interface CartService {

    void addToCart(List<AddToCartDTO> addToCartDTOList);

    List<CartDTO> getCartItems(Long userId);

    void updateCartItem(Long userId, Long cartId, Long quantity, Long price);

    boolean removeFromCart(Long cartId);

    CartSummaryDTO getCartSummary(Long userId);

    CartDTO convertToDTO(Cart cart);
}
