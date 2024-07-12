package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.*;
import com.daewon.xeno_z1.dto.auth.GetOneDTO;
import com.daewon.xeno_z1.dto.order.*;
import com.daewon.xeno_z1.dto.page.PageInfinityResponseDTO;
import com.daewon.xeno_z1.dto.page.PageRequestDTO;
import com.daewon.xeno_z1.dto.product.ProductHeaderDTO;
import com.daewon.xeno_z1.dto.review.ReviewCardDTO;
import com.daewon.xeno_z1.exception.UserNotFoundException;
import com.daewon.xeno_z1.repository.OrdersRepository;
import com.daewon.xeno_z1.repository.ProductsColorSizeRepository;
import com.daewon.xeno_z1.repository.ProductsImageRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import io.jsonwebtoken.io.IOException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.aspectj.weaver.ast.Or;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final UserRepository userRepository;
    private final OrdersRepository ordersRepository;
    private final ProductsColorSizeRepository productsColorSizeRepository;
    private final ProductsImageRepository productsImageRepository;


    @Value("${uploadPath}")
    private String uploadPath;

    public byte[] getImage(String uuid, String fileName) throws IOException, java.io.IOException {
        String filePath = uploadPath + uuid + "_" + fileName;
        // 파일을 바이트 배열로 읽기
        Path path = Paths.get(filePath);
        byte[] image = Files.readAllBytes(path);
        return image;
    }


    @Override
    public List<OrdersListDTO> getAllOrders(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        log.info("user: " + userId);
        List<Orders> orders = ordersRepository.findByUser(user);
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrdersDTO> createOrders(List<OrdersDTO> ordersDTO, String email) {

        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Orders orders = new Orders();

        Long orderNumber = generateOrderNumber();

        for(OrdersDTO dto : ordersDTO) {
            orders = Orders.builder()
                .orderPayId(dto.getOrderPayId())
                .orderNumber(orderNumber)
                .productsColorSize(findProductColorSize(dto.getProductColorSizeId()))
                .user(users)
                .status("결제 완료")
                .req(dto.getReq())
                .quantity(dto.getQuantity())
                .amount(dto.getAmount())
                .build();
            ordersRepository.save(orders);

        }

        return ordersDTO;
    }

    @Override
    @Transactional
    // 데이터 일관성 보장(address, phoneNumber 둘 다 맞는 값이어야지 저장이 돼야 함)
    // 예외 처리(처리 중 예외가 발생하면 DB를 rollBack 시키기 위해)
    // Transactinal을 사용함
    public void updateUserDeliveryInfo(String email, String address, String phoneNumber) {
        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        users.setAddress(address);
        users.setPhoneNumber(phoneNumber);

        userRepository.save(users);
    }

//    @Override
//    public OrdersConfirmDTO confirmOrder(Long orderId) {
//
//        Orders orders = ordersRepository.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Order not found"));
//        return new OrdersConfirmDTO(
//                String.valueOf(order.getOrderId()),
//                String.valueOf(order.getOrderNumber()),
//                order.getUserId().getName(),
//                order.getUserId().getAddress(),
//                String.valueOf(order.getAmount())
//        );
//    }

    @Override
    public OrdersListDTO convertToDTO(Orders orders) {
        OrdersListDTO ordersListDTO = new OrdersListDTO();

        ordersListDTO.setReq(orders.getReq());
        ordersListDTO.setProductColorSizeId(orders.getProductsColorSize().getProductColorSizeId());
        ordersListDTO.setOrderNumber(orders.getOrderNumber());
        ordersListDTO.setOrderDate(orders.getCreateAt());
        ordersListDTO.setBrandName(orders.getProductsColorSize().getProductsColor().getProducts().getBrandName());
        ordersListDTO.setStatus(orders.getStatus());
        ordersListDTO.setAmount(orders.getAmount());
        ordersListDTO.setQuantity(orders.getQuantity());

        // GetOneDTO 리스트 생성 및 설정
        List<GetOneDTO> getOneList = new ArrayList<>();
        getOneList.add(createGetOneDTO(orders.getUser()));
        ordersListDTO.setGetOne(getOneList);

        return ordersListDTO;
    }

    private GetOneDTO createGetOneDTO(Users users) {
        return new GetOneDTO(users.getPhoneNumber(), users.getAddress());
    }

    // 주문번호 orderNumber 랜덤생성
    private Long generateOrderNumber() {
        long timestamp = System.currentTimeMillis();
        long random = new Random().nextInt(1000000); // 6자리 랜덤 숫자

        // timestamp를 왼쪽으로 20비트 시프트하고 랜덤 값을 더함
        return (timestamp << 20) | random;
    }

    // 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열 이어야함.
    // 위 조건에 해당하는 랜덤 orderPayId값 생성
    private String generateOrderPayId(String ord) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
        String specialChars = "-_=";
        StringBuilder stringBuilder = new StringBuilder(specialChars);
        Random random = new Random();
        int length = random.nextInt(59) + 6; // 6 to 64 characters

        for (int i = specialChars.length(); i < length; i++) {
            stringBuilder.append(chars.charAt(random.nextInt(chars.length())));
        }

        List<Character> charList = new ArrayList<>();
        for (char c : stringBuilder.toString().toCharArray()) {
            charList.add(c);
        }
        Collections.shuffle(charList);

        StringBuilder orderPayId = new StringBuilder();
        for (char c : charList) {
            orderPayId.append(c);
        }
        return orderPayId.toString();
    }

    private ProductsColorSize findProductColorSize(Long productColorSizeId) {
        return productsColorSizeRepository.findById(productColorSizeId)
                .orElseThrow(() -> new EntityNotFoundException("ProductsColorSize not found with id: " + productColorSizeId));
    }


    @Override
    public PageInfinityResponseDTO<OrdersCardListDTO> getOrderCardList(PageRequestDTO pageRequestDTO,String email) {


        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPageIndex() <= 0 ? 0 : pageRequestDTO.getPageIndex() - 1,
                pageRequestDTO.getSize(),
                Sort.by("orderId").ascending());

        Users users = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));

        Page<Orders> orders = ordersRepository.findPagingOrdersByUser(pageable,users);

        List<OrdersCardListDTO> dtoList = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        for(Orders order : orders.getContent()) {
            OrdersCardListDTO dto = new OrdersCardListDTO();
            dto.setOrderId(order.getOrderId());
            dto.setOrderDate(order.getCreateAt().format(formatter));
            dto.setStatus(order.getStatus());
            dto.setAmount(order.getAmount());
            dto.setQuantity(order.getQuantity());
            dto.setColor(order.getProductsColorSize().getProductsColor().getColor());
            dto.setSize(order.getProductsColorSize().getSize().name());
            dto.setBrandName(order.getProductsColorSize().getProductsColor().getProducts().getBrandName());
            dto.setProductName(order.getProductsColorSize().getProductsColor().getProducts().getName());

            ProductsImage productsImage = productsImageRepository.findFirstByProductColorId(order.getProductsColorSize().getProductsColor().getProductColorId());
            if (productsImage != null) {
                try {
                    byte[] data = getImage(productsImage.getUuid(), productsImage.getFileName());
                    dto.setProductImage(data);
                } catch (java.io.IOException e) {
                    throw new RuntimeException(e);
                }
            } else {
                dto.setProductImage(null);
            }
            dtoList.add(dto);
        }

        return PageInfinityResponseDTO.<OrdersCardListDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .totalIndex((int) orders.getTotalElements())
                .build();
    }

    @Override
    public ProductHeaderDTO getProductHeader(Long orderId, String email) {

        Users users = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));

        log.info(email);
        log.info(orderId);

        log.info(users.getUserId());
        Orders orders = ordersRepository.findByOrderIdAndUserId(orderId,users);
        log.info(orders);
        ProductHeaderDTO dto = new ProductHeaderDTO();
        dto.setProductColorId(orders.getProductsColorSize().getProductsColor().getProductColorId());
        dto.setName(orders.getProductsColorSize().getProductsColor().getProducts().getName());
        dto.setColor(orders.getProductsColorSize().getProductsColor().getColor());

        return dto;
    }
}
