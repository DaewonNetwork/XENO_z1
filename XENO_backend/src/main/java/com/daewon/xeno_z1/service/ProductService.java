package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.*;

import java.io.IOException;
import java.util.List;

import com.daewon.xeno_z1.dto.product.ProductCreateDTO;
import com.daewon.xeno_z1.dto.product.ProductUpdateDTO;
import org.hibernate.mapping.Map;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    Products createProduct(ProductCreateDTO productCreateDTO, String uploadPath);

    Products updateProduct(Long productId, ProductUpdateDTO productUpdateDTO);

    void deleteProduct(Long productId);

    ProductInfoDTO getProductInfo(Long productId) throws IOException;

    ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size);

    List<ProductOtherColorImagesDTO>  getRelatedColorProductsImages(Long productColorId) throws IOException;

    ProductOrderBarDTO getProductOrderBar(Long productColorId);

    void addToCart(List<AddToCartDTO> addToCartDTO);

    List<ProductsInfoByCategoryDTO> getProductsInfoByCategory(String categoryId,String categorySubId);
}
