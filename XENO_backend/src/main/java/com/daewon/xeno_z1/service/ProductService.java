package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.dto.*;
import com.daewon.xeno_z1.dto.review.ReviewDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

//  Page<ProductsStarRankListDTO> getTop50ProductsByCategory(String category, int page, int size);

    Products createProduct(ProductregisterDTO productregisterDTO, List<MultipartFile> productImage, List<MultipartFile> productDetailimage);

//    Review createReview(ReviewDTO reviewDTO, List<MultipartFile> images);
}
