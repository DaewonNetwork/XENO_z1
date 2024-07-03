package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.CartRequestDTO;
import com.daewon.xeno_z1.repository.CartRepository;
import com.daewon.xeno_z1.repository.ProductsRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Log4j2
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final UserRepository userRepository;
    private final ProductsRepository productsRepository;
    private final CartRepository cartRepository;

    @Override
    public Long addCart(CartRequestDTO request, Long productId) {

        // 회원 정보
        Users user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NoSuchElementException("USER_NOT_FOUND"));
        // 상품 정보
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("PRODUCT_NOT_FOUND"));


        Cart existingCart = cartRepository.findByProductAndUser(product, user).orElse(null);

        // 카트에 이미 상품이 담겨있는 경우
        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + request.getQuantity());
            existingCart.setPrice(existingCart.getPrice() + product.getPrice() * request.getQuantity());

            cartRepository.save(existingCart);

            return existingCart.getCartId();
        } else {    // 카트에 상품이 없는 경우
            Long price = product.getPrice() * request.getQuantity();
            Cart cart = new Cart(user, product, request.getQuantity(), price);

            cartRepository.save(cart);

            return cart.getCartId();
        }
    }
}
