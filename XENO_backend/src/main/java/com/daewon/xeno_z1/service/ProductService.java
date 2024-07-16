
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

    String updateProduct(ProductUpdateDTO productUpdateDTO);

    void deleteProduct(Long productId);

<<<<<<< HEAD
=======
    void deleteProductColor(Long productColorId);
>>>>>>> Product_Detail_Page2

    String createProductColor(ProductRegisterColorDTO dto, List<MultipartFile> productImage, MultipartFile productDetailImage);

    String updateProductColor(ProductUpdateColorDTO dto, List<MultipartFile> productImage, MultipartFile productDetailImage);
<<<<<<< HEAD

    List<ProductListBySellerDTO> getProductListBySeller(String email);

    List<ProductColorListBySellerDTO> getProductColorListBySeller(String email);

}
=======

     List<ProductListBySellerDTO> getProductListBySeller(String email);

    List<ProductColorListBySellerDTO> getProductColorListBySeller(String email);

    ProductColorUpdateGetInfoDTO getProductColorSizeInfo(Long productColorId) throws IOException;

    byte[] readImage(Long productColorId) throws IOException;

}
>>>>>>> Product_Detail_Page2
