package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.repository.*;
import com.daewon.xeno_z1.security.exception.ProductNotFoundException;

import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.repository.*;
import com.daewon.xeno_z1.security.exception.ProductNotFoundException;
import com.daewon.xeno_z1.utils.CategoryUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductsRepository productsRepository;
    private final ProductsImageRepository productsImageRepository;
    private final ProductsDetailImageRepository productsDetailImageRepository;
    private final ProductsStarRepository productsStarRepository;
    private final ProductsLikeRepository productsLikeRepository;
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final ProductsColorRepository productsColorRepository;
    private final ProductsColorSizeRepository productsColorSizeRepository;
    private final ProductsStockRepository productsStockRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;


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
    public Products createProduct(ProductregisterDTO dto, List<MultipartFile> productImage, List<MultipartFile> productDetailimage) {
        // 1. Products 엔티티 생성 및 저장
        Products product = Products.builder()
                .brandName(dto.getBrand_name())
                .name(dto.getName())
                .category(dto.getCategory())
                .categorySub(dto.getCategory_sub())
                .price(dto.getPrice())
                .priceSale(dto.getPrice_sale())
                .isSale(dto.is_sale())
                .productsNumber(Long.parseLong(dto.getProducts_number()))
                .season(dto.getSeason())
                .starAvg(0)  // 초기 평균 별점은 0으로 설정
                .build();
        product = productsRepository.save(product);

        // 2. ProductsColor 엔티티 생성 및 저장
        for (String color : dto.getColors()) {
            ProductsColor productsColor = ProductsColor.builder()
                    .products(product)
                    .color(color)
                    .build();
            productsColor = productsColorRepository.save(productsColor);

            // 3. ProductsColorSize 엔티티 생성 및 저장
//            for (String size : dto.getSize()) {
//                ProductsColorSize productsColorSize = ProductsColorSize.builder()
//                        .productsColor(productsColor)
//                        .size(Size.valueOf(size.toUpperCase()))
//                        .build();
//                productsColorSize = productsColorSizeRepository.save(productsColorSize);
//
//                // ProductsStock 엔티티 생성 및 저장
//                ProductsStock productsStock = ProductsStock.builder()
//                        .productsColorSize(productsColorSize)
//                        .stock(100L)  // 초기 재고를 100으로 설정
//                        .build();
//                productsStockRepository.save(productsStock);
//            }

            // 4. ProductsImage 엔티티 생성 및 저장
            if (productImage != null && !productImage.isEmpty()) {
                for (MultipartFile image : productImage) {
                    String fileName = saveImage(image);
                    String uuid = UUID.randomUUID().toString();
                    ProductsImage productsImage = ProductsImage.builder()
                            .productsColor(productsColor)
                            .fileName(fileName)
                            .uuid(uuid)
                            .build();
                    productsImageRepository.save(productsImage);
                }
            }

            // 5. ProductsDetailImage 엔티티 생성 및 저장
            if (productDetailimage != null && !productDetailimage.isEmpty()) {
                for (MultipartFile image : productDetailimage) {
                    String fileName = saveImage(image);
                    String uuid = UUID.randomUUID().toString();
                    ProductsDetailImage productsDetailImage = ProductsDetailImage.builder()
                            .productsColor(productsColor)
                            .fileName(fileName)
                            .uuid(uuid)
                            .build();
                    productsDetailImageRepository.save(productsDetailImage);
                }
            }
        }
        return product;
    }

    private String saveImage(MultipartFile image) {
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadPath, fileName);
        
        try {
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("이미지 저장 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("이미지 저장 실패", e);
        }
        return fileName;
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
        productInfoDTO.setProductColorId(productColorId);
        productInfoDTO.setBrandName(products.getProducts().getBrandName());
        productInfoDTO.setName(products.getProducts().getName());
        productInfoDTO.setCategory(products.getProducts().getCategory());
        productInfoDTO.setCategorySub(products.getProducts().getCategorySub());
        productInfoDTO.setPrice(products.getProducts().getPrice());
        productInfoDTO.setPriceSale(products.getProducts().getPriceSale());
        productInfoDTO.setProductsNumber(products.getProducts().getProductsNumber());
        productInfoDTO.setSeason(products.getProducts().getSeason());
        productInfoDTO.setSale(products.getProducts().getIsSale());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info(authentication);
        String currentUserName = authentication.getName();

        log.info(currentUserName);
        String email = "joohyeongzz@naver.com";

        Users users = userRepository.findByEmail(currentUserName)
                .orElse(null);

        if (users != null) {
            Long userId = users.getUserId();
            LikeProducts likeProducts = likeRepository.findByProductColorIdAndUserId(productColorId, userId);
            productInfoDTO.setLike(likeProducts != null ? likeProducts.isLike() : false);
        } else {
            productInfoDTO.setLike(false);
        }

        ProductsStar productsStar = productsStarRepository.findByProductColorId(productColorId).orElse(null);

        productInfoDTO.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);

        ProductsLike productsLike = productsLikeRepository.findByProductColorId(productColorId).orElse(null);

        productInfoDTO.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);

        // 약국정보의 총 리뷰 수를 Review 테이블에서 productId를 통해 Select, Count 반환, 없을경우 0
        productInfoDTO.setReviewIndex(
                reviewRepository.countReviewImagesByProductId(productColorId) != 0
                        ? reviewRepository.countReviewImagesByProductId(productColorId)
                        : 0);

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
        Page<ProductsDetailImage> productDetailImages = productsDetailImageRepository
                .findByProductColorId(productColorId, pageable);
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
        log.info("카운트" + count);
        log.info("카운트1" + productDetailImages);
        return productDetailImagesDTO;
    }

    @Override
    public List<ProductOtherColorImagesDTO> getRelatedColorProductsImages(Long productColorId) throws IOException {
        List<ProductOtherColorImagesDTO> colorImagesList = new ArrayList<>();

        Optional<ProductsColor> productsColorOptional = productsColorRepository.findById(productColorId);

        // 현재 상품 색상 이미지 추가
        ProductsImage currentProductsImage = productsImageRepository.findFirstByProductColorId(productColorId);
        if (currentProductsImage != null) {
            byte[] currentImageData = null;
            try {
                // 서버 파일 시스템에서 파일 존재 여부 확인
                Path filePath = Paths.get("C:/upload",
                        currentProductsImage.getUuid() + "_" + currentProductsImage.getFileName());
                if (Files.exists(filePath)) {
                    currentImageData = getImage(currentProductsImage.getUuid(), currentProductsImage.getFileName());
                    ProductOtherColorImagesDTO currentColorDTO = new ProductOtherColorImagesDTO();
                    currentColorDTO.setProductColorId(productColorId);
                    currentColorDTO.setProductColorImage(currentImageData);
                    colorImagesList.add(currentColorDTO);
                } else {
                    // 파일이 서버에 존재하지 않는 경우 예외 처리 (예: 기본 이미지 설정)
                    System.out.println("Warning: 현재 상품 색상 이미지 파일이 서버에 존재하지 않습니다. 파일 경로: " + filePath.toString());
                    // 예외 처리 로직을 추가할 수 있습니다.
                }
            } catch (IOException e) {
                // 파일을 가져오는 도중 예외가 발생한 경우 처리
                System.out.println("Error fetching current product color image: " + e.getMessage());
                // 예외 처리 로직을 추가할 수 있습니다.
            }
        }

        // 상품의 다른 색상 이미지들 추가
        List<ProductsColor> colors = productsColorRepository
                .findByProductId(productsColorOptional.get().getProducts().getProductId());
        for (ProductsColor productsColor : colors) {
            if (productsColor.getProductColorId() == productColorId) {
                continue; // 현재 상품 색상은 이미 추가했으므로 건너뜁니다.
            }

            ProductOtherColorImagesDTO dto = new ProductOtherColorImagesDTO();
            dto.setProductColorId(productsColor.getProductColorId());

            ProductsImage otherProductsImage = productsImageRepository
                    .findFirstByProductColorId(productsColor.getProductColorId());
            if (otherProductsImage != null) {
                // 서버 파일 시스템에서 파일 존재 여부 확인
                Path filePath = Paths.get("C:/upload",
                        otherProductsImage.getUuid() + "_" + otherProductsImage.getFileName());
                if (Files.exists(filePath)) {
                    byte[] otherImageData = getImage(otherProductsImage.getUuid(), otherProductsImage.getFileName());
                    dto.setProductColorImage(otherImageData);
                    colorImagesList.add(dto);
                } else {
                    // 파일이 서버에 존재하지 않는 경우 예외 처리 (예: 기본 이미지 설정)
                    log.info("Warning: 파일이 서버에 존재하지 않습니다. 데이터베이스 정보: " + otherProductsImage.getUuid() + "_"
                            + otherProductsImage.getFileName());
                    // 기본 이미지 설정 등의 로직을 추가할 수 있습니다.
                }
            }

        }
        return colorImagesList;
    }

    @Override
    public ProductOrderBarDTO getProductOrderBar(Long productColorId) {
        ProductOrderBarDTO dto = new ProductOrderBarDTO();
        log.info("Initial DTO: " + dto);
        List<ProductStockDTO> productsStockDTO = new ArrayList<>();

        try {

            // 상품 좋아요 수 가져오기
            ProductsLike productsLike = productsLikeRepository.findByProductColorId(productColorId).orElse(null);
            dto.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);

            // 상품 색상 정보 가져오기
            ProductsColor productsColor = productsColorRepository.findById(productColorId)
                    .orElseThrow(() -> new DataAccessException("Product color not found for ID: " + productColorId) {
                        // 예외 클래스를 사용자 정의하여 추가 정보를 제공할 수 있습니다.
                    });
            Products products = productsRepository.findById(productsColor.getProducts().getProductId()).orElse(null);

            dto.setPrice(products.getIsSale() ? products.getPriceSale() : products.getPrice());

            List<ProductsColor> productsColors = productsColorRepository
                    .findByProductId(productsColor.getProducts().getProductId());

            List<Long> idList = new ArrayList<>();

            for (ProductsColor pc : productsColors) {
                Long id = pc.getProductColorId();
                idList.add(id);
            }

            for (Long id : idList) {
                List<ProductsColorSize> productsColorSizes = productsColorSizeRepository.findByProductColorId(id);
                for (ProductsColorSize pcs : productsColorSizes) {
                    ProductStockDTO stockDTO = new ProductStockDTO();
                    stockDTO.setProductColorId(pcs.getProductsColor().getProductColorId());
                    stockDTO.setProductColorSizeId(pcs.getProductColorSizeId());
                    stockDTO.setColor(pcs.getProductsColor().getColor());
                    stockDTO.setSize(pcs != null ? pcs.getSize().name() : "에러");
                    ProductsStock productsStock = productsStockRepository
                            .findByProductColorSizeId(pcs.getProductColorSizeId());
                    stockDTO.setStock(productsStock != null ? productsStock.getStock() : 0);
                    productsStockDTO.add(stockDTO);
                }
            }
            dto.setOrderInfo(productsStockDTO);

            // 상품 사이즈 및 재고 정보 가져오기

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserName = authentication.getName();
            log.info("이름:" + currentUserName);
            Users users = userRepository.findByEmail(currentUserName)
                    .orElse(null); // 유저 객체 생성

            if (users != null) { // 로그인한 경우
                Long userId = users.getUserId();
                LikeProducts likeProducts = likeRepository.findByProductColorIdAndUserId(productColorId, userId);
                dto.setLike(likeProducts != null ? likeProducts.isLike() : false); // 즐겨찾기 여부
            } else {
                dto.setLike(false); // 로그인 안한경우 무조건 false
            }

        } catch (DataAccessException e) {
            log.error("Data access error while fetching product order bar details: " + e.getMessage(), e);
        }

        return dto;
    }

    @Override
    public List<ProductsInfoCardDTO> getProductsInfoByCategory(String categoryId, String categorySubId) {
        List<Products> productsList = new ArrayList<>();
        if (categoryId.equals("000") && categorySubId.isEmpty()) {
            productsList = productsRepository.findAll();
        } else if (categorySubId.isEmpty()) {
            String category = CategoryUtils.getCategoryFromCode(categoryId);
            productsList = productsRepository.findByCategory(category);
        } else {
            String category = CategoryUtils.getCategoryFromCode(categoryId);
            String categorySub = CategoryUtils.getCategorySubFromCode(categorySubId);
            productsList = productsRepository.findByCategorySub(category, categorySub);
        }

        List<ProductsInfoCardDTO> productsInfoCardDTOList = new ArrayList<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = authentication.getName();

        String email = "joohyeongzz@naver.com";

        Users users = userRepository.findByEmail(currentUserName)
                .orElse(null);

        log.info(users);

        for (Products products : productsList) {
            List<ProductsColor> productsColors = productsColorRepository.findByProductId(products.getProductId());
            for (ProductsColor productsColor : productsColors) {
                ProductsInfoCardDTO dto = new ProductsInfoCardDTO();
                dto.setBrandName(products.getBrandName());
                dto.setName(products.getName());
                dto.setCategory(products.getCategory());
                dto.setCategorySub(products.getCategorySub());
                dto.setPrice(products.getPrice());
                dto.setPriceSale(products.getPriceSale());
                dto.setSale(products.getIsSale());
                if (users != null) {
                    Long userId = users.getUserId();
                    LikeProducts likeProducts = likeRepository
                            .findByProductColorIdAndUserId(productsColor.getProductColorId(), userId);
                    dto.setLike(likeProducts != null ? likeProducts.isLike() : false);
                } else {
                    dto.setLike(false);
                }
                ProductsLike productsLike = productsLikeRepository
                        .findByProductColorId(productsColor.getProductColorId()).orElse(null);
                ProductsStar productsStar = productsStarRepository
                        .findByProductColorId(productsColor.getProductColorId()).orElse(null);
                ProductsImage productsImage = productsImageRepository
                        .findFirstByProductColorId(productsColor.getProductColorId());
                if (productsImage != null) {
                    try {
                        byte[] imageData = getImage(productsImage.getUuid(), productsImage.getFileName());
                        dto.setProductImage(imageData);
                    } catch (IOException e) {

                    }
                } else {
                    dto.setProductImage(null);
                }
                dto.setProductColorId(productsColor.getProductColorId());
                dto.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);
                dto.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);

                productsInfoCardDTOList.add(dto);
            }
        }

        return productsInfoCardDTOList;
    }

    @Override
    public List<ProductsInfoCardDTO> getLikedProductsInfo() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = authentication.getName();

        Users users = userRepository.findByEmail(currentUserName)
                .orElse(null);

        log.info(users);
        List<LikeProducts> likeProductsList = likeRepository.findByUserId(users.getUserId());
        log.info(likeProductsList);
        List<ProductsInfoCardDTO> productsInfoCardDTOList = new ArrayList<>();

        for (LikeProducts likeProducts : likeProductsList) {
            ProductsInfoCardDTO dto = new ProductsInfoCardDTO();
            ProductsLike productsLike = productsLikeRepository
                    .findById(likeProducts.getProductsLike().getProductLikeId()).orElse(null);
            // log.info(productsLike);
            ProductsColor productsColor = productsLike.getProductsColor();
            log.info(productsColor);
            Products products = productsColor.getProducts();
            log.info(products);
            ProductsStar productsStar = productsStarRepository.findByProductColorId(productsColor.getProductColorId())
                    .orElse(null);
            log.info(productsStar);

            dto.setBrandName(products.getBrandName());
            log.info(dto);
            dto.setName(products.getName());
            log.info(dto);
            dto.setCategory(products.getCategory());
            log.info(dto);
            dto.setCategorySub(products.getCategorySub());
            log.info(dto);
            dto.setPrice(products.getPrice());
            log.info(dto);
            dto.setPriceSale(products.getPriceSale());
            log.info(dto);
            dto.setSale(products.getIsSale());
            log.info(dto);
            dto.setLike(likeProducts.isLike());
            log.info(dto);
            dto.setProductColorId(productsColor.getProductColorId());
            dto.setLikeIndex(productsLike != null ? productsLike.getLikeIndex() : 0);
            dto.setStarAvg(productsStar != null ? productsStar.getStarAvg() : 0);
            ProductsImage productsImage = productsImageRepository
                    .findFirstByProductColorId(productsColor.getProductColorId());
            log.info(productsImage);
            if (productsImage != null) {
                try {
                    byte[] imageData = getImage(productsImage.getUuid(), productsImage.getFileName());
                    dto.setProductImage(imageData);
                    log.info("성공");
                } catch (IOException e) {
                    log.info(e.getMessage());
                }
            } else {
                log.info("널입니다");
                dto.setProductImage(null);
            }
            productsInfoCardDTOList.add(dto);
            log.info(productsInfoCardDTOList);
            log.info(dto);
        }

        return productsInfoCardDTOList;
    }

    // 모든 카테고리 랭크 10
    @Override
    public Map<String, List<ProductsStarRankListDTO>> getTop10ProductsByCategoryRank() {
        List<String> categories = Arrays.asList("상의", "아우터", "하의");
        Map<String, List<ProductsStarRankListDTO>> result = new HashMap<>();

        for (String category : categories) {
            List<Products> top10Products = productsRepository.findTop10ProductsByCategory(category);
            List<ProductsStarRankListDTO> dtoList = top10Products.stream()
                    .map(product -> {
                        ProductsStar productsStar = productsStarRepository.findByProductId(product.getProductId())
                                .orElse(null);
                        ProductsStarRankListDTO dto = ProductsStarRankListDTO.builder()
                                .productId(product.getProductId())
                                .productName(product.getName())
                                .brandName(product.getBrandName())
                                .price(product.getPrice())
                                .priceSale(product.getPriceSale())
                                .isSale(product.getIsSale())
                                .starAvg(productsStar != null ? productsStar.getStarAvg() : 0)
                                .reviewCount(reviewRepository.countReviewImagesByProductId(product.getProductId()))
                                .category(product.getCategory())
                                .categorySub(product.getCategorySub())
                                .build();

                        // 상품 이미지 가져오기
                        List<ProductsImage> productImages = productsImageRepository
                                .findByProductColorId(product.getProductId());
                        if (!productImages.isEmpty()) {
                            try {
                                byte[] imageData = getImage(productImages.get(0).getUuid(),
                                        productImages.get(0).getFileName());
                                dto.setProductImage(imageData);
                            } catch (IOException e) {
                                log.error("Error loading product image", e);
                            }
                        }

                        return dto;
                    })
                    .sorted(Comparator.comparingDouble(ProductsStarRankListDTO::getStarAvg).reversed())
                    .limit(10)
                    .collect(Collectors.toList());
            result.put(category, dtoList);
        }

        return result;
    }

    // 카테고리 별 랭크 10개
    @Override
    public List<ProductsStarRankListDTO> getTop10ProductsBySpecificCategory(String category) {
        List<Products> top10Products = productsRepository.findTop10ProductsByCategory(category);
        return top10Products.stream()
                .map(product -> {
                    ProductsStar productsStar = productsStarRepository.findByProductId(product.getProductId())
                            .orElse(null);
                    ProductsStarRankListDTO dto = ProductsStarRankListDTO.builder()
                            .productId(product.getProductId())
                            .productName(product.getName())
                            .brandName(product.getBrandName())
                            .price(product.getPrice())
                            .priceSale(product.getPriceSale())
                            .isSale(product.getIsSale())
                            .starAvg(productsStar != null ? productsStar.getStarAvg() : 0)
                            .reviewCount(reviewRepository.countReviewImagesByProductId(product.getProductId()))
                            .category(product.getCategory())
                            .categorySub(product.getCategorySub())
                            .build();

                    List<ProductsImage> productImages = productsImageRepository
                            .findByProductColorId(product.getProductId());
                    if (!productImages.isEmpty()) {
                        try {
                            byte[] imageData = getImage(productImages.get(0).getUuid(),
                                    productImages.get(0).getFileName());
                            dto.setProductImage(imageData);
                        } catch (IOException e) {
                            log.error("Error loading product image", e);
                        }
                    }

                    return dto;
                })
                .sorted(Comparator.comparingDouble(ProductsStarRankListDTO::getStarAvg).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    // 랭크 50개
    @Override
    public List<ProductsStarRankListDTO> getTop50ProductsByCategory(String category) {
        List<Products> top50Products = productsRepository.findTop50ProductsByCategory(category);
        return top50Products.stream()
                .map(product -> {
                    ProductsStar productsStar = productsStarRepository.findByProductId(product.getProductId())
                            .orElse(null);
                    ProductsStarRankListDTO dto = ProductsStarRankListDTO.builder()
                            .productId(product.getProductId())
                            .productName(product.getName())
                            .brandName(product.getBrandName())
                            .price(product.getPrice())
                            .priceSale(product.getPriceSale())
                            .isSale(product.getIsSale())
                            .starAvg(productsStar != null ? productsStar.getStarAvg() : 0)
                            .reviewCount(reviewRepository.countReviewImagesByProductId(product.getProductId()))
                            .category(product.getCategory())
                            .categorySub(product.getCategorySub())
                            .build();

                    List<ProductsImage> productImages = productsImageRepository
                            .findByProductColorId(product.getProductId());
                    if (!productImages.isEmpty()) {
                        try {
                            byte[] imageData = getImage(productImages.get(0).getUuid(),
                                    productImages.get(0).getFileName());
                            dto.setProductImage(imageData);
                        } catch (IOException e) {
                            log.error("Error loading product image", e);
                        }
                    }

                    return dto;
                })
                .sorted(Comparator.comparingDouble(ProductsStarRankListDTO::getStarAvg).reversed())
                .limit(50)
                .collect(Collectors.toList());
    }

}
