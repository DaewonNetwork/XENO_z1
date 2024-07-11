package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.*;

import com.daewon.xeno_z1.dto.product.ProductCreateDTO;
import com.daewon.xeno_z1.dto.product.ProductUpdateDTO;
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
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    @Transactional
    public Products createProduct(ProductCreateDTO productCreateDTO, String uploadPath) {

//        ProductsColorSize productsColorSize = new ProductsColorSize();
//
//        productsColorSize.getProductsColor().getProducts().setName(productCreateDTO.getProductName());
//        productsColorSize.getProductsColor().getProducts().setBrandName(productCreateDTO.getBrandName());
//        productsColorSize.getProductsColor().getProducts().setPrice(productCreateDTO.getPrice());
//        productsColorSize.getProductsColor().getProducts().setIsSale(productCreateDTO.isSale());
//        productsColorSize.getProductsColor().getProducts().setPriceSale(productCreateDTO.getPriceSale());
//        productsColorSize.getProductsColor().getProducts().setCategory(productCreateDTO.getCategory());
//        productsColorSize.getProductsColor().getProducts().setCategorySub(productCreateDTO.getCategorySub());

        // 8자리 임의의 숫자 생성
        Long productNumber;
        do {
            productNumber = 10000000 + (long) (Math.random() * 90000000);
        } while (productsRepository.existsByProductsNumber(productNumber));

        Products product = Products.builder()
                .name(productCreateDTO.getProductName())
                .brandName(productCreateDTO.getBrandName())
                .price(productCreateDTO.getPrice())
                .isSale(productCreateDTO.isSale())
                .priceSale(productCreateDTO.getPriceSale())
                .category(productCreateDTO.getCategory())
                .categorySub(productCreateDTO.getCategorySub())
                .productsNumber(productNumber)
                .season(productCreateDTO.getSeason())
                .build();

        // 제품을 먼저 저장하여 productId를 생성함
        product = productsRepository.save(product);

        // 제품 대표 이미지 저장
        List<ProductsImage> productsImages = new ArrayList<>();
        if (productCreateDTO.getProductImages() != null && !productCreateDTO.getProductImages().isEmpty()) {

            for (int i = 0; i < productCreateDTO.getProductImages().size(); i++) {
                MultipartFile mainImageFile = productCreateDTO.getProductImages().get(i);

                if (mainImageFile != null && !mainImageFile.isEmpty()) {
                    String originalMainImageName = mainImageFile.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    Path savePath = Paths.get(uploadPath, uuid + "_" + originalMainImageName);

                    try {
                        mainImageFile.transferTo(savePath.toFile());

                        // ProductsImage 엔티티 생성 및 저장
                        ProductsImage productsImage = ProductsImage.builder()
                                .uuid(uuid)
                                .fileName(originalMainImageName)
                                .ord(i) // 현재 루프의 인덱스를 순서로 사용함
                                .build();

                        productsImages.add(productsImage);
                    } catch (IOException e) {
                        log.error("파일 저장하는 도중 오류가 발생했습니다: ", e);
                        throw new RuntimeException("File processing error", e);
                    }
                }
            }
        }

        // 제품 상세 이미지 저장
        List<ProductsDetailImage> productsDetailImages = new ArrayList<>();
        if (productCreateDTO.getProductDetailImages() != null && !productCreateDTO.getProductDetailImages().isEmpty()) {

            for (int i = 0; i < productCreateDTO.getProductDetailImages().size(); i++) {
                MultipartFile detailsImageFile = productCreateDTO.getProductDetailImages().get(i);

                if (detailsImageFile != null && !detailsImageFile.isEmpty()) {
                    String originalDetailsImageName = detailsImageFile.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();
                    Path savePath = Paths.get(uploadPath, uuid + "_" + originalDetailsImageName);

                    try {
                        detailsImageFile.transferTo(savePath.toFile());

                        // ProductsImage 엔티티 생성 및 저장
                        ProductsDetailImage productsDetailImage = ProductsDetailImage.builder()
                                .uuid(uuid)
                                .fileName(originalDetailsImageName)
                                .ord(i) // 현재 루프의 인덱스를 순서로 사용함
                                .build();

                        productsDetailImages.add(productsDetailImage);
                    } catch (IOException e) {
                        log.error("파일 저장하는 도중 오류가 발생했습니다: ", e);
                        throw new RuntimeException("File processing error", e);
                    }
                }
            }
        }

        // 색상, 사이즈, 재고 설정
        /*
           ProductsColor가 먼저 저장되어야 ProductsColorSize에서 참조가 가능하기 떄문에
           color를 먼저 DB에 저장하고
           마찬가지로 ProductsColorSIze가 저장되어야 ProductsStock에서 참조할 수 있으므로
           color -> size -> stock 순으로 순차적으로 DB에 저장해줌
         */
        List<ProductsColor> productsColors = new ArrayList<>();
        for(int i = 0; i < productCreateDTO.getColors().size(); i++ ) {
            // 상품 색상 설정
            ProductsColor color = ProductsColor.builder()
                    .products(product)
                    .color(productCreateDTO.getColors().get(i))
                    .build();

            color = productsColorRepository.save(color);
            productsColors.add(color);

            for(ProductsImage mainImage : productsImages) {
                mainImage.setProductsColor(color);
            }
            for(ProductsDetailImage detailImage : productsDetailImages) {
                detailImage.setProductsColor(color);
            }

            // 상품 색상에 해당하는 사이즈 설정
            ProductsColorSize size = ProductsColorSize.builder()
                    .productsColor(color)
                    .size(Size.valueOf(productCreateDTO.getSize().get(i).toUpperCase()))
                    .build();

            size = productsColorSizeRepository.save(size);

            // 상품 색상에 해당하고 사이즈에 해당하는 재고 설정
            ProductsStock stock = ProductsStock.builder()
                    .productsColorSize(size)
                    .stock(productCreateDTO.getStock().get(i))
                    .build();

            productsStockRepository.save(stock);
        }

        productsImageRepository.saveAll(productsImages);
        productsDetailImageRepository.saveAll(productsDetailImages);

        return product;
    }

    @Override
    public Products updateProduct(Long productId, ProductUpdateDTO productUpdateDTO) {
        return null;
    }

    @Override
    public void deleteProduct(Long productId) {

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
            LikeProducts likeProducts = likeRepository.findByProductColorIdAndUserId(productColorId,userId);
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
                Path filePath = Paths.get("C:/upload", currentProductsImage.getUuid() + "_" + currentProductsImage.getFileName());
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
        List<ProductsColor> colors = productsColorRepository.findByProductId(productsColorOptional.get().getProducts().getProductId());
        for (ProductsColor productsColor : colors) {
            if (productsColor.getProductColorId() == productColorId) {
                continue; // 현재 상품 색상은 이미 추가했으므로 건너뜁니다.
            }

            ProductOtherColorImagesDTO dto = new ProductOtherColorImagesDTO();
            dto.setProductColorId(productsColor.getProductColorId());

            ProductsImage otherProductsImage = productsImageRepository.findFirstByProductColorId(productsColor.getProductColorId());
            if (otherProductsImage != null) {
                // 서버 파일 시스템에서 파일 존재 여부 확인
                Path filePath = Paths.get("C:/upload", otherProductsImage.getUuid() + "_" + otherProductsImage.getFileName());
                if (Files.exists(filePath)) {
                    byte[] otherImageData = getImage(otherProductsImage.getUuid(), otherProductsImage.getFileName());
                    dto.setProductColorImage(otherImageData);
                    colorImagesList.add(dto);
                } else {
                    // 파일이 서버에 존재하지 않는 경우 예외 처리 (예: 기본 이미지 설정)
                    log.info("Warning: 파일이 서버에 존재하지 않습니다. 데이터베이스 정보: " + otherProductsImage.getUuid() + "_" + otherProductsImage.getFileName());
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

            List<ProductsColor> productsColors = productsColorRepository.findByProductId(productsColor.getProducts().getProductId());

            List<Long> idList = new ArrayList<>();

            for (ProductsColor pc : productsColors){
                Long id = pc.getProductColorId();
                idList.add(id);
            }

            for(Long id : idList) {
                List<ProductsColorSize> productsColorSizes = productsColorSizeRepository.findByProductColorId(id);
                for(ProductsColorSize pcs : productsColorSizes) {
                ProductStockDTO stockDTO = new ProductStockDTO();
                    stockDTO.setProductColorId(pcs.getProductsColor().getProductColorId());
                    stockDTO.setProductColorSizeId(pcs.getProductColorSizeId());
                    stockDTO.setColor(pcs.getProductsColor().getColor());
                    stockDTO.setSize(pcs != null ? pcs.getSize().name() : "에러");
                    ProductsStock productsStock = productsStockRepository.findByProductColorSizeId(pcs.getProductColorSizeId());
                    stockDTO.setStock(productsStock != null ? productsStock.getStock():0);
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
                LikeProducts likeProducts = likeRepository.findByProductColorIdAndUserId(productColorId,userId);
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
    public void addToCart(List<AddToCartDTO> addToCartDTOList) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info(authentication);
        String currentUserName = authentication.getName();

        log.info(currentUserName);
        String email = "joohyeongzz@naver.com";

        Users users = userRepository.findByEmail(currentUserName == "anonymousUser" ? email : currentUserName  )
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Cart cart = new Cart();
        for(AddToCartDTO addToCartDTO: addToCartDTOList) {
            cart = cartRepository.findByProductColorSizeIdAndUser(addToCartDTO.getProductColorSizeId(),users.getUserId()).orElse(null);
            ProductsColorSize productsColorSize = productsColorSizeRepository.findById(addToCartDTO.getProductColorSizeId()).orElse(null);
            ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(productsColorSize.getProductsColor().getProductColorId());
            if(cart == null) {
                cart = Cart.builder()
                        .price(addToCartDTO.getPrice())
                        .productsColorSize(productsColorSize)
                        .quantity(addToCartDTO.getQuantity())
                        .user(users)
                        .productsImage(productsImage)
                        .build();
                cartRepository.save(cart);
            } else {
                cart.setQuantity(cart.getQuantity()+addToCartDTO.getQuantity());
                cart.setPrice(cart.getPrice()+ addToCartDTO.getPrice());
                cartRepository.save(cart);
            }
        }
    }

    @Override
    public List<ProductsInfoByCategoryDTO> getProductsInfoByCategory(String categoryId, String categorySubId) {
        List<Products> productsList = new ArrayList<>();
        if (categoryId.equals("000") && categorySubId.isEmpty()){
            productsList = productsRepository.findAll();
        } else if (categorySubId.isEmpty()) {
            String category = CategoryUtils.getCategoryFromCode(categoryId);
            productsList = productsRepository.findByCategory(category);
        } else {
            String category = CategoryUtils.getCategoryFromCode(categoryId);
            String categorySub = CategoryUtils.getCategorySubFromCode(categorySubId);
            productsList = productsRepository.findByCategorySub(category,categorySub);
        }

        List<ProductsInfoByCategoryDTO> productsInfoByCategoryDTOList = new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = authentication.getName();

        String email = "joohyeongzz@naver.com";

        Users users = userRepository.findByEmail(currentUserName)
                .orElse(null);

        for (Products products : productsList) {
            List<ProductsColor> productsColors = productsColorRepository.findByProductId(products.getProductId());
            for (ProductsColor productsColor : productsColors) {
                ProductsInfoByCategoryDTO dto = new ProductsInfoByCategoryDTO();
                dto.setBrandName(products.getBrandName());
                dto.setName(products.getName());
                dto.setCategory(products.getCategory());
                dto.setCategorySub(products.getCategorySub());
                dto.setPrice(products.getPrice());
                dto.setPriceSale(products.getPriceSale());
                dto.setSale(products.getIsSale());
                if (users != null) {
                    Long userId = users.getUserId();
                    LikeProducts likeProducts = likeRepository.findByProductColorIdAndUserId(productsColor.getProductColorId(),userId);
                    dto.setLike(likeProducts != null ? likeProducts.isLike() : false);
                } else {
                    dto.setLike(false);
                }
                ProductsLike productsLike = productsLikeRepository.findByProductColorId(productsColor.getProductColorId()).orElse(null);
                ProductsStar productsStar = productsStarRepository.findByProductColorId(productsColor.getProductColorId()).orElse(null);
                ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(productsColor.getProductColorId());
                if(productsImage != null) {
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

                productsInfoByCategoryDTOList.add(dto);
            }
        }

        return productsInfoByCategoryDTOList;
    }


}






