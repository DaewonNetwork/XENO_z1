package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;

import com.daewon.xeno_z1.dto.product.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import com.daewon.xeno_z1.dto.product.ProductRegisterDTO;
import com.daewon.xeno_z1.dto.product.ProductUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    Products updateProduct(Long productId, ProductUpdateDTO productUpdateDTO);

    void deleteProduct(Long productId);

    ProductInfoDTO getProductInfo(Long productId) throws IOException;

    ProductsInfoCardDTO getProductCardInfo(Long productColorId);

    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);

    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    void addToCart(List<AddToCartDTO> addToCartDTO);

//    List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category);

//    Map<String, List<ProductsStarRankListDTO>> getTop10ProductsByCategoryRank();

//  List<ProductsStarRankListDTO> getTop50ProductsByCategory(String category);

//    Page<ProductsStarRankListDTO> getTop50ProductsByCategory(String category, int page, int size);

    Products createProduct(ProductRegisterDTO productregisterDTO, List<MultipartFile> productImage, MultipartFile productDetailimage);

    List<ProductsInfoByCategoryDTO> getProductsInfoByCategory(String categoryId,String categorySubId);

    Products createProduct(ProductRegisterDTO dto, List<MultipartFile> productImage, MultipartFile productDetailImage);

}
