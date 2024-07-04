package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId);
    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);
    List<byte[]> getRelatedColorProductsImages(Long productColorId);
}
