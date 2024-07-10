package com.daewon.xeno_z1.service;


import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.*;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

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

    List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category);

//  List<ProductsStarRankListDTO> getTop50ProductsByCategory(String category);

    Page<ProductsStarRankListDTO> getTop50ProductsByCategory(String category, int page, int size);

    Products createProduct(ProductregisterDTO productregisterDTO, List<MultipartFile> productImage, List<MultipartFile> productDetailimage);

//  Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images);
}
