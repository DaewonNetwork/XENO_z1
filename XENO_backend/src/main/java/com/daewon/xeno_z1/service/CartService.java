package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.CartRequestDTO;

public interface CartService {

    Long addCart(CartRequestDTO request, Long productId);
}
