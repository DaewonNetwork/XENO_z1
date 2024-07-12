package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.*;

import java.io.IOException;
import java.util.List;

import com.daewon.xeno_z1.dto.product.ProductRegisterDTO;
import com.daewon.xeno_z1.dto.product.ProductUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    Products updateProduct(Long productId, ProductUpdateDTO productUpdateDTO);

    void deleteProduct(Long productId);

    ProductInfoDTO getProductInfo(Long productId) throws IOException;

    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);

    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    void addToCart(List<AddToCartDTO> addToCartDTO);

    List<ProductsInfoByCategoryDTO> getProductsInfoByCategory(String categoryId,String categorySubId);

    Products createProduct(ProductRegisterDTO dto, List<MultipartFile> productImage, MultipartFile productDetailImage);

}
