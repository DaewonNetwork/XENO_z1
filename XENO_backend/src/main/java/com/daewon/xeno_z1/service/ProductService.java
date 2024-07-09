package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.dto.ProductsStarRankListDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId);
    
    ProductDetailImagesDTO getProductDetailImages(Long productId, int page, int size);

    Map<String, List<ProductsStarRankListDTO>> getTop10ProductsByCategoryRank();

    List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category);

    Page<ProductsStarRankListDTO> getTop50ProductsByCategory(String category, int page, int size);

}
