package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.ProductInfoDTO;

import java.util.List;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId);
    List<byte[]> getProductDetailImages(Long productId);

}
