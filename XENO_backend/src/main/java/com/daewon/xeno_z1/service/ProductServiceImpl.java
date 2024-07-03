package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.ProductDetailImagesDTO;
import com.daewon.xeno_z1.dto.ProductInfoDTO;

import com.daewon.xeno_z1.repository.*;
import com.daewon.xeno_z1.security.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final ProductsImageRepository productsImageRepository;
    private final ProductsDetailImageRepository productsDetailImageRepository;
    private final ProductsStarRepository productsStarRepository;
    private final ProductsLikeRepository productsLikeRepository;
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final ProductsColorRepository productsColorRepository;

    @Value("${uploadPath}")
    private String uploadPath;

    public byte[] getImage(String uuid, String fileName) throws IOException {
        String filePath = uploadPath + uuid + "_" + fileName;
        // 파일을 바이트 배열로 읽기
        Path path = Paths.get(filePath);
        byte[] image = Files.readAllBytes(path);
        return image;
    }

    @Override
    public ProductInfoDTO getProductInfo(Long productId) {
        log.info(productId);

        Optional<ProductsColor> result = productsColorRepository.findById(productId);
        ProductsColor products = result.orElseThrow(() -> new ProductNotFoundException()); // Products 객체 생성
        List<ProductsColor> resultList = productsColorRepository.findByProductId(productId);
        // resultList의 크기가 2개 이상인 경우 isColor를 true로 설정
        ProductInfoDTO productInfoDTO = modelMapper.map(products, ProductInfoDTO.class); // dto 매핑
        if (resultList.size() > 1) {
            productInfoDTO.setColor(true);
        }


        // 별점 매긴 약국 찾기
        ProductsStar productsStar = productsStarRepository.findByProductId(productId).orElse(null);
        // 결과가 null이 아니라면 그 약국의 별점 평균, null이라면 0
        productInfoDTO.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);

        // 즐겨찾기한 약국 찾기
        ProductsLike productsLike = productsLikeRepository.findByProductId(productId).orElse(null);
        // 결과가 null이 아니라면 그 약국의 즐겨찾기 수, null이라면 0
        productInfoDTO.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);

        // 약국정보의 총 리뷰 수를 Review 테이블에서 productId를 통해 Select, Count 반환, 없을경우 0
        productInfoDTO.setReviewIndex(
                reviewRepository.countByProductsProductId(productId) != 0 ? reviewRepository.countByProductsProductId(productId) : 0);


        List<ProductsImage> productImages = productsImageRepository.findByProductId(products.getProductColorId());
        List<byte[]> imageBytesList = new ArrayList<>();
        for (ProductsImage productsImage : productImages) {
            try {
                byte[] imageData = getImage(productsImage.getUuid(), productsImage.getFileName());
                imageBytesList.add(imageData);
            } catch (IOException e) {
                // 예외 처리
                e.printStackTrace();
            }
        }
        productInfoDTO.setProductImages(imageBytesList);

        return productInfoDTO;
    }

    @Override
    public ProductDetailImagesDTO getProductDetailImages(Long productId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductsDetailImage> productDetailImages = productsDetailImageRepository.findByProductId(productId, pageable);
        long count = productDetailImages.getTotalElements();
        // ProductsDetailImage를 byte[]로 변환하여 새로운 Page 객체 생성
        Page<byte[]> detailImageBytesPage = productDetailImages.map(productsImage -> {
            try {
                byte[] imageData = getImage(productsImage.getUuid(), productsImage.getFileName());
                return imageData;
            } catch (IOException e) {
                // 예외 처리
                e.printStackTrace();
                return null; // 예외 발생 시 null 반환
            }
        });

        ProductDetailImagesDTO productDetailImagesDTO = new ProductDetailImagesDTO();
        productDetailImagesDTO.setProductImages(detailImageBytesPage);
        productDetailImagesDTO.setImagesCount(count);
        log.info("카운트"+count);
        log.info("카운트1"+productDetailImages);
        return productDetailImagesDTO;
    }

}
