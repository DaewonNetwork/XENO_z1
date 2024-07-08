package com.daewon.xeno_z1.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private Long cartId;
    private Long userId;
    private Long productsColorSizeId;
    private Long productsImageId;
    private Long quantity;
    private Long price;
    private String brandName;

}
