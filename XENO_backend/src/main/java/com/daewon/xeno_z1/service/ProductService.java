package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.dto.*;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId) throws IOException;
    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);
    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    Cart addToCart(List<AddToCartDTO> addToCartDTO);


}
