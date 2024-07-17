package com.daewon.xeno_z1.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private Long cartId;
    private Long productsColorSizeId;
    private Long quantity;
    private Long price;
    private String brandName;
//    private String imageUuid;
//    private String imageFileName;
    private byte[] productImage;
    private Long priceSale;
    private boolean isSale;
}
