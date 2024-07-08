package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.cart.AddToCartDTO;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.cart.CartSummaryDTO;
import com.daewon.xeno_z1.exception.ProductNotFoundException;
import com.daewon.xeno_z1.exception.UserNotFoundException;
import com.daewon.xeno_z1.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
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
    public void addToCart(List<AddToCartDTO> addToCartDTOList) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info(authentication);
        String currentUserName = authentication.getName();

        log.info(currentUserName);

        Users users = userRepository.findByEmail(currentUserName)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Cart cart = new Cart();


        for(AddToCartDTO addToCartDTO: addToCartDTOList) {
            cart = cartRepository.findByProductColorSizeIdAndUser(addToCartDTO.getProductColorSizeId(),users.getUserId()).orElse(null);
            ProductsColorSize productsColorSize = productsColorSizeRepository.findById(addToCartDTO.getProductColorSizeId()).orElse(null);
            ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(productsColorSize.getProductsColor().getProductColorId());
            if(cart == null) {
                cart = Cart.builder()
                        .price(addToCartDTO.getPrice())
                        .productsColorSize(productsColorSize)
                        .quantity(addToCartDTO.getQuantity())
                        .user(users)
                        .productsImage(productsImage)
                        .build();
                cartRepository.save(cart);
            } else {
                cart.setQuantity(cart.getQuantity()+addToCartDTO.getQuantity());
                cart.setPrice(cart.getPrice()+ addToCartDTO.getPrice());
                cartRepository.save(cart);
            }
        }
    }

    @Override
    public List<CartDTO> getCartItems(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        List<Cart> carts = cartRepository.findByUser(user);
        return carts.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void updateCartItem(Long cartId, Long quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("장바구니 상품을 찾을 수 없습니다."));
        cart.setQuantity(quantity);
        cart.setPrice(cart.getProductsColorSize().getProductsColor().getProducts().getPrice() * quantity);
        cartRepository.save(cart);
    }

    @Override
    public boolean removeFromCart(Long cartId) {
        if (cartRepository.existsById(cartId)) {
            cartRepository.deleteById(cartId);
            return true;
        }
        return false;
    }

    @Override
    public CartSummaryDTO getCartSummary(Long userId) {
        List<Cart> carts = cartRepository.findByUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found")));

        Long totalPrice = carts.stream()
                .mapToLong(cart -> cart.getPrice())
                .sum();
        int totalItems = carts.stream()
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
        cartDTO.setBrandName(cart.getProductsColorSize().getProductsColor().getProducts().getBrandName());
        return cartDTO;
    }
}
