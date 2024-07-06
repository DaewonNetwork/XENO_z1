package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;
import com.daewon.xeno_z1.exception.ProductNotFoundException;
import com.daewon.xeno_z1.exception.UserNotFoundException;
import com.daewon.xeno_z1.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;
    private final ProductsRepository productsRepository;
    private final CartRepository cartRepository;
    private final ProductsColorSizeRepository productsColorSizeRepository;
    private final ProductsImageRepository productsImageRepository;

    @Override
    public void addToCart(Long userId, Long productColorSizeId, Long productImageId, Long quantity) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        ProductsColorSize productsColorSize = productsColorSizeRepository.findById(productColorSizeId)
                .orElseThrow(() -> new ProductNotFoundException("상품의 색상 또는 사이즈를 찾을 수 없습니다."));
        ProductsImage productsImage = productsImageRepository.findById(productImageId)
                .orElseThrow(() -> new RuntimeException("상품의 이미지를 찾을 수 없습니다."));

        Products products = productsColorSize.getProductsColor().getProducts();
        Long price = products.getPrice() * quantity;

        Cart cart = new Cart(user, productsColorSize, productsImage, quantity, price);
        cartRepository.save(cart);
    }

    @Override
    public List<CartDTO> getCartItems(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        List<Cart> carts = cartRepository.findByUser(user);
        return carts.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void updateCartItem(Long cartId, Long quantity, boolean selected) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("장바구니 상품을 찾을 수 없습니다."));
        cart.setQuantity(quantity);
        cart.setSelected(selected);
        cart.setPrice(cart.getProductsColorSize().getProductsColor().getProducts().getPrice() * quantity);
        cartRepository.save(cart);
    }

    @Override
    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public CartSummaryDTO getCartSummary(Long userId) {
        List<Cart> carts = cartRepository.findByUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found")));
        long totalPrice = carts.stream()
                .filter(Cart::isSelected)
                .mapToLong(cart -> cart.getPrice())
                .sum();
        int totalItems = carts.stream()
                .filter(Cart::isSelected)
                .mapToInt(cart -> cart.getQuantity().intValue())
                .sum();
        return new CartSummaryDTO(totalItems, totalPrice);
    }

    @Override
    public CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        cartDTO.setUserId(cart.getUser().getUserId());
        cartDTO.setProductsColorSizeId(cart.getProductsColorSize().getProductColorSizeId());
        cartDTO.setProductsImageId(cart.getProductsImage().getProductImageId());
        cartDTO.setQuantity(cart.getQuantity());
        cartDTO.setPrice(cart.getPrice());
        cartDTO.setSelected(cart.isSelected());
        cartDTO.setBrandName(cart.getProductsColorSize().getProductsColor().getProducts().getBrandName());
        return cartDTO;
    }
}
