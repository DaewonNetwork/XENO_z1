package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.dto.ProductregisterDTO;
import com.daewon.xeno_z1.dto.ProductsStarRankListDTO;
import org.springframework.web.multipart.MultipartFile;
import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.dto.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ProductInfoDTO getProductInfo(Long productId) throws IOException;
    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);
    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    void addToCart(List<AddToCartDTO> addToCartDTO);


    List<ProductsInfoByCategoryDTO> getProductsInfoByCategory(String categoryId,String categorySubId);



     Map<String, List<ProductsStarRankListDTO>> getTop10ProductsByCategoryRank();

     List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category);

     List<ProductsStarRankListDTO> getTop50ProductsByCategory(String category);

//   Page<ProductsStarRankListDTO> getTop50ProductsByCategory(String category, int page, int size);
}
