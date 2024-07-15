package com.daewon.xeno_z1.service;


import com.daewon.xeno_z1.domain.Products;

import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.dto.product.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductInfoDTO getProductColorInfo(Long productColorId) throws IOException;
    ProductCreateGetInfoDTO getProductInfo(Long productId) throws IOException;

    ProductsInfoCardDTO getProductCardInfo(Long productColorId);

    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);

    List<ProductOtherColorImagesDTO> getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    List<ProductsInfoCardDTO> getProductsInfoByCategory(String categoryId, String categorySubId);

    List<ProductsInfoCardDTO> getLikedProductsInfo();


    Products createProduct(ProductRegisterDTO productregisterDTO, List<MultipartFile> productImage, MultipartFile productDetailImage);

    String createProductColor(ProductRegisterColorDTO dto, List<MultipartFile> productImage, MultipartFile productDetailImage);

     List<ProductListBySellerDTO> getProductListBySeller(String email);

    String updateProduct(Long productId, ProductUpdateDTO productUpdateDTO);

    void deleteProduct(Long productId);


}