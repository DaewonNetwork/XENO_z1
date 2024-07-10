package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId) throws IOException;

    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);

    List<ProductOtherColorImagesDTO> getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    List<ProductsInfoCardDTO> getProductsInfoByCategory(String categoryId, String categorySubId);

    List<ProductsInfoCardDTO> getLikedProductsInfo();

    Map<String, List<ProductsStarRankListDTO>> getTop10ProductsByCategoryRank();

    List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category);

    List<ProductsStarRankListDTO> getTop50ProductsByCategory(String category);

}
