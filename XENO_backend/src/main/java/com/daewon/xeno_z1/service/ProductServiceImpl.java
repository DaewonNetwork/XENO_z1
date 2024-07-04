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
import java.util.*;

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
    public ProductInfoDTO getProductInfo(Long productColorId) {
        log.info(productColorId);
        
        Optional<ProductsColor> result = productsColorRepository.findById(productColorId);
        ProductsColor products = result.orElseThrow(() -> new ProductNotFoundException()); // Products 객체 생성
        List<ProductsColor> resultList = productsColorRepository.findByProductId(products.getProducts().getProductId());

        ProductInfoDTO productInfoDTO = modelMapper.map(products, ProductInfoDTO.class); // dto 매핑
        if (resultList.size() > 1) {
            productInfoDTO.setBooleanColor(true);
            List<String> colors = new ArrayList<>();
            for (ProductsColor productsColor : resultList) {
                colors.add(productsColor.getColor());
            }
            productInfoDTO.setColorType(colors);
        } else {
            productInfoDTO.setBooleanColor(false); // resultList의 크기가 1 이하인 경우 false로 설정
            // 필요한 경우 다른 로직 추가
        }

        productInfoDTO.setProductId(products.getProducts().getProductId());
        productInfoDTO.setBrandName(products.getProducts().getBrandName());
        productInfoDTO.setName(products.getProducts().getName());
        productInfoDTO.setCategory(products.getProducts().getCategory());
        productInfoDTO.setCategorySub(products.getProducts().getCategorySub());
        productInfoDTO.setPrice(products.getProducts().getPrice());
        productInfoDTO.setPriceSale(products.getProducts().getPriceSale());
        productInfoDTO.setProductsNumber(products.getProducts().getProductsNumber());
        productInfoDTO.setSeason(products.getProducts().getSeason());
        productInfoDTO.setSale(products.getProducts().isSale());


        // 별점 매긴 약국 찾기
        ProductsStar productsStar = productsStarRepository.findByProductColorId(productColorId).orElse(null);
        // 결과가 null이 아니라면 그 약국의 별점 평균, null이라면 0
        productInfoDTO.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);

        // 즐겨찾기한 약국 찾기
        ProductsLike productsLike = productsLikeRepository.findByProductColorId(productColorId).orElse(null);
        // 결과가 null이 아니라면 그 약국의 즐겨찾기 수, null이라면 0
        productInfoDTO.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);

        // 약국정보의 총 리뷰 수를 Review 테이블에서 productId를 통해 Select, Count 반환, 없을경우 0
        productInfoDTO.setReviewIndex(
                reviewRepository.countByProductsProductId(productColorId) != 0 ? reviewRepository.countByProductsProductId(productColorId) : 0);
        List<ProductsImage> productImages = productsImageRepository.findByProductColorId(products.getProductColorId());
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
    public ProductDetailImagesDTO getProductDetailImages(Long productColorId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductsDetailImage> productDetailImages = productsDetailImageRepository.findByProductColorId(productColorId, pageable);
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

    @Override
    public List<byte[]> getRelatedColorProductsImages(Long productColorId) {

        Optional<ProductsColor> productsColorOptional = productsColorRepository.findById(productColorId);
        log.info(productsColorOptional);

        List<ProductsColor> productsColors = null;
        List<ProductsImage> images = new ArrayList<>();

        ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(productColorId);

        if (productsImage != null) {
            images.add(productsImage);
        }

        if (productsColorOptional.isPresent()) {
            Long productsId = productsColorOptional.get().getProducts().getProductId();

            productsColors = productsColorRepository.findByProductId(productsId);

        } else {
            // productsColorOptional이 비어있을 경우 처리
        }
        log.info(productsColors);

        for (ProductsColor productsColor : productsColors) {
            productColorId = productsColor.getProductColorId();

            productsImage = productsImageRepository.findFirstByProductColorId(productColorId);
            if (images.contains(productsImage)) {
                images.add(productsImage);
            }
        }

        log.info(images);


        // 결과를 담을 리스트 초기화
        List<byte[]> imageBytesList = new ArrayList<>();

// ProductsImages 리스트의 각 ProductsImage를 byte[]로 변환하여 imageBytesList에 추가
        for (ProductsImage findProductsImage : images) {
            try {
                byte[] imageData = getImage(findProductsImage.getUuid(), findProductsImage.getFileName());
                imageBytesList.add(imageData);
            } catch (IOException e) {
                // IOException 발생 시 예외 처리
                e.printStackTrace();
            }
        }

        log.info(imageBytesList);

        return imageBytesList;
    }





}
