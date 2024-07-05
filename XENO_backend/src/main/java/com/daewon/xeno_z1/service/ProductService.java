package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.ProductOrderBarDTO;
import com.daewon.xeno_z1.dto.ProductOtherColorImagesDTO;
import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId) throws IOException;
    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);
    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);
}
