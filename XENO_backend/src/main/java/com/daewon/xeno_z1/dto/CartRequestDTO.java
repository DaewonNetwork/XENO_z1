package com.daewon.xeno_z1.dto;

import com.daewon.xeno_z1.domain.Cart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequestDTO {

    private Long userId;
    private Long quantity;

    public CartRequestDTO(Cart cart) {
        this(
                cart.getUser().getUserId(),
                cart.getQuantity()
        );
    }
}
