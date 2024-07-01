package com.daewon.xeno_z1.service;


import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.dto.ProductInfoDTO;
import com.daewon.xeno_z1.repository.*;
import com.daewon.xeno_z1.security.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final ProductsStarRepository productsStarRepository;
    private final ProductsLikeRepository productsLikeRepository;
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    @Override
    public ProductInfoDTO getProductInfo(Long productId) {
        log.info(productId);

        Optional<Products> result = productsRepository.findById(productId);
        Products products = result.orElseThrow(() -> new ProductNotFoundException()); // Products 객체 생성

        ProductInfoDTO ProductsInfoDTO = modelMapper.map(products, ProductInfoDTO.class); // dto 매핑


//        // 별점 매긴 약국 찾기
//        ProductsStar productsStar = productsStarRepository.findByProductId(productId).orElse(null);
//        // 결과가 null이 아니라면 그 약국의 별점 평균, null이라면 0
//        ProductsInfoDTO.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);
//
//        // 즐겨찾기한 약국 찾기
//        ProductsLike productsLike = productsLikeRepository.findByProductId(productId).orElse(null);
//        // 결과가 null이 아니라면 그 약국의 즐겨찾기 수, null이라면 0
//        ProductsInfoDTO.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);
//
//        // 약국정보의 총 리뷰 수를 Review 테이블에서 productId를 통해 Select, Count 반환, 없을경우 0
//        ProductsInfoDTO.setReviewIndex(
//                reviewRepository.countByProductsProductId(productId) != 0 ? reviewRepository.countByProductsProductId(productId) : 0);

        return ProductsInfoDTO;
    }
}
