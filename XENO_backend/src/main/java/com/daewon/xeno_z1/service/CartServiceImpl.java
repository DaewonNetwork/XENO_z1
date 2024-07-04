package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.CartRequestDTO;
import com.daewon.xeno_z1.exception.ProductNotFoundException;
import com.daewon.xeno_z1.exception.UserNotFoundException;
import com.daewon.xeno_z1.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;


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
        public Long addCart(CartRequestDTO request, Long productId) {
            // 회원 정보
            Users user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));

            // 상품 정보
            Products product = productsRepository.findById(productId)
                    .orElseThrow(() -> new ProductNotFoundException("해당하는 제품을 찾을 수 없습니다."));

            // ProductsColorSize 정보
            ProductsColorSize productsColorSize = productsColorSizeRepository.findById(request.getProductsColorsizeId())
                    .orElseThrow(() -> new ProductNotFoundException("해당하는 제품 색상 및 사이즈를 찾을 수 없습니다."));

            // ProductsImage 정보
            ProductsImage productsImage = productsImageRepository.findById(request.getProductsImageId())
                    .orElseThrow(() -> new ProductNotFoundException("해당하는 제품 이미지를 찾을 수 없습니다."));

            Long productColorId = productsColorSize.getProductsColor().getProductColorId();

            List<Cart> existingCarts = cartRepository.findByUserAndProductsColorSize_ProductColorId(user, productColorId);

            Cart existingCart = existingCarts.stream()
                    .filter(cart -> cart.getProductsColorSize().getProductColorSizeId().e)
                    .findFirst()
                    .orElse(null);

//            Cart existingCart = cartRepository.findByProductsColorSize_ProductsAndUser(product, user).orElse(null);

            // 카트에 이미 상품이 담겨있는 경우
            if (existingCart != null) {
                existingCart.setQuantity(existingCart.getQuantity() + request.getQuantity());
                existingCart.setPrice(existingCart.getPrice() + product.getPrice() * request.getQuantity());

                cartRepository.save(existingCart);

                return existingCart.getCartId();
            } else {    // 카트에 상품이 없는 경우
                Long price = product.getPrice() * request.getQuantity();
                Cart cart = new Cart(user, productsColorSize, productsImage, request.getQuantity(), price);

                cartRepository.save(cart);

                return cart.getCartId();
            }
        }
}
